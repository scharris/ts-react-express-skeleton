param(
   [Parameter(Mandatory)] $DagenVersion,
   [Parameter(Mandatory)] $GeneratedSourceRoot
)
$ErrorActionPreference = 'Stop'; Set-StrictMode -Version Latest

# Do an npm install for the specs-serializer.
try
{
  Push-Location "$PSScriptRoot/specs-serializer/"
  npm install
  if ($LASTEXITCODE -ne 0) { throw "npm install for dagen/specs-serializer failed with error." }
}
finally
{
  Pop-Location
}

$jsonSpecsDir = "$PSScriptRoot/specs-serializer/output"

# Make json form of the query specs from their typescript definitions.
npm --prefix="$PSScriptRoot/specs-serializer" run make-query-specs-json output/
if ($LASTEXITCODE -ne 0) { throw "Conversion of query specs to json format failed with error." }

# input directories
$querySpecs = "$jsonSpecsDir/query-specs.json"
$dbmd = "$PSScriptRoot/dbmd/dbmd.yml"
# output directories
$sqlDir = "$GeneratedSourceRoot/sql"
$queryTypesDir = "$GeneratedSourceRoot/query-types"
$relMdsDir = "$GeneratedSourceRoot/schema-metadata"

& "$PSScriptRoot/lib/build-jar-if-absent" $DagenVersion

$JAR="$PSScriptRoot/lib/dagen-$DagenVersion.jar"

Remove-Item $sqlDir/*.sql

# queries
Write-Output "Generating query SQL and matching TypeScript types."
Remove-Item $queryTypesDir/*.ts
java -cp "$JAR" org.sqljson.QueryGeneratorMain --types-language:TypeScript  `
   $dbmd $querySpecs $queryTypesDir $sqlDir
if ($LASTEXITCODE -ne 0) { throw "Query generation failed with error." }

# relation metadatas
Write-Output "Generating relation metadata Typescript module."
Remove-Item $GeneratedSourceRoot/schema-metadata/*.ts
java -cp "$JAR" org.sqljson.DatabaseRelationClassesGeneratorMain --types-language:TypeScript `
  $dbmd $relMdsDir
if ($LASTEXITCODE -ne 0) { throw "Relation metadata generation failed with error." }
