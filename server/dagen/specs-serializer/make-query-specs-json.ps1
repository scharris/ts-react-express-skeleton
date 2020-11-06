param(
   [Parameter(Mandatory)] $InputTS,
   [Parameter(Mandatory)] $OutputJson
)
$ErrorActionPreference = 'Stop'; Set-StrictMode -Version Latest

try
{
   Push-Location $PSScriptRoot
   npm install
   if ($LASTEXITCODE -ne 0) { throw "npm install for dagen/specs-serializer failed with error." }

   # Make json form of the query specs from their typescript definitions.
   npm run make-query-specs-json -- $InputTS $OutputJson
   if ($LASTEXITCODE -ne 0) { throw "Conversion of query specs to json format failed with error." }
}
finally
{
   Pop-Location
}
