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

# Make json form of the query/mod specs from their typescript definitions.
npm --prefix="$PSScriptRoot/specs-serializer" run make-spec-jsons output/

# input directories
$querySpecs = "$jsonSpecsDir/query-specs.json"
$modSpecs = "$jsonSpecsDir/mod-specs.json"
$dbmd = "$PSScriptRoot/dbmd/dbmd.yml"
# output directories
$queryTypesDir = "$GeneratedSourceRoot/query-types"
$querySqlsDir = "$GeneratedSourceRoot/sql/queries"
$modStmtParamsDir = "$GeneratedSourceRoot/mod-stmt-params"
$modStmtSqlsDir = "$GeneratedSourceRoot/sql/mod-stmts"
$relMdsDir = "$GeneratedSourceRoot/schema-metadata"

& "$PSScriptRoot/lib/build-jar-if-absent" $DagenVersion

$JAR="$PSScriptRoot/lib/dagen-$DagenVersion.jar"

# queries
Write-Output "Generating query SQL and matching TypeScript types."
Remove-Item $queryTypesDir/*.ts, $querySqlsDir/*.sql
java -cp "$JAR" org.sqljson.QueryGeneratorMain --types-language:TypeScript  `
   $dbmd $querySpecs $queryTypesDir $querySqlsDir
if ($LASTEXITCODE -ne 0) { throw "Query generation failed with error." }

# modification statements
Write-Output "Generating mod statements and companion TypeScript modules."
Remove-Item $modStmtParamsDir/*.ts, $modStmtSqlsDir/*.sql
java -cp "$JAR" org.sqljson.ModStatementGeneratorMain --types-language:TypeScript `
  $dbmd $modSpecs $modStmtParamsDir $modStmtSqlsDir
if ($LASTEXITCODE -ne 0) { throw "Mod statement generation failed with error." }

# relation metadatas
Write-Output "Generating relation metadata Typescript module."
Remove-Item $GeneratedSourceRoot/schema-metadata/*.ts
java -cp "$JAR" org.sqljson.DatabaseRelationClassesGeneratorMain --types-language:TypeScript `
  $dbmd $relMdsDir
if ($LASTEXITCODE -ne 0) { throw "Relation metadata generation failed with error." }
