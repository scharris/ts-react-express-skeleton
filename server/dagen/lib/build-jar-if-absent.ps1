param ([Parameter(Mandatory)] $DagenVersion)
$ErrorActionPreference = 'Stop'; Set-StrictMode -Version Latest

$scriptDir = $PSScriptRoot
$dagenRepoUrl = "https://github.com/scharris/dagen.git"
$jarName = "dagen-$DagenVersion.jar"

function New-TempDir
{
    $dirPath = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid().ToString())
    New-Item -ItemType Directory -Path $dirPath
}

if ( -Not (Test-Path -Path $scriptDir/$jarName -PathType Leaf) )
{
    Write-Information "Building dagen."

    Remove-item $scriptDir/*.jar

    $buildDir = New-TempDir

    Write-Information "Building in directory $buildDir."

    git clone --depth 1 --branch $DagenVersion  $dagenRepoUrl $buildDir
    if ($LASTEXITCODE -ne 0) { throw "Failed to fetch dagen version ${DagenVersion}." }

    cmd.exe /c "cd $buildDir && mvn -DskipTests package && mvn typescript-generator:generate@ts-spec-types"

    Copy-Item $buildDir/target/dagen.jar $scriptDir/$jarName
    Copy-Item $buildDir/target/spec-types.ts $scriptDir/

    Remove-item -Recurse $buildDir -Force
}
else
{
    Write-Information "The dagen jar already exists, skipping its build."
}
