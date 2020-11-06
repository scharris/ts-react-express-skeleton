param(
   [Parameter(Mandatory)] $DagenVersion,
   [Parameter(Mandatory)] $GeneratedSourceRoot
)
$ErrorActionPreference = 'Stop'; Set-StrictMode -Version Latest

$SD = $PSScriptRoot
$querySpecsJson = "$SD/query-specs.json"

# Make final query specifications (json format) from the query specs TypeScript module's default export.
& "$SD/specs-serializer/make-query-specs-json" -InputTS $SD/query-specs.ts -OutputJson $querySpecsJson

$dbmd = "$SD/dbmd/dbmd.yml"
$sqlDir = "$GeneratedSourceRoot/sql"
$queryTypesDir = "$GeneratedSourceRoot/query-types"
$relMdsDir = "$GeneratedSourceRoot/schema-metadata"

& "$SD/lib/build-jar-if-absent" $DagenVersion

$JAR="$SD/lib/dagen-$DagenVersion.jar"

Remove-Item $sqlDir/*.sql

# queries
Write-Output "Generating query SQL and matching TypeScript types."
Remove-Item $queryTypesDir/*.ts
java -cp "$JAR" org.sqljson.QueryGeneratorMain --types-language:TypeScript  `
   $dbmd $querySpecsJson $queryTypesDir $sqlDir
if ($LASTEXITCODE -ne 0) { throw "Query generation failed with error." }

# relation metadatas
Write-Output "Generating relation metadata Typescript module."
Remove-Item $GeneratedSourceRoot/schema-metadata/*.ts
java -cp "$JAR" org.sqljson.DatabaseRelationClassesGeneratorMain --types-language:TypeScript `
  $dbmd $relMdsDir
if ($LASTEXITCODE -ne 0) { throw "Relation metadata generation failed with error." }
