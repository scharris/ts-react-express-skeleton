$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest
$dagenVer = $args[0]

$scriptDir = $PSScriptRoot
$dagenRepoUrl = "https://github.com/scharris/dagen.git"
$jarName = "dagen-$dagenVer.jar"

function New-TempDir
{
    $dirPath = Join-Path ([System.IO.Path]::GetTempPath()) ([System.Guid]::NewGuid().ToString())
    New-Item -ItemType Directory -Path $dirPath
}

if ( -Not (Test-Path -Path $scriptDir/$jarName -PathType Leaf) )
{
    Write-Host "Building dagen."

    $buildDir = New-TempDir
    
    Write-Host "Building in directory $buildDir."

    git clone --depth 1 --branch $dagenVer  $dagenRepoUrl $buildDir

    cmd.exe /c "cd $buildDir && mvn -DskipTests package"

    Copy-Item $buildDir/target/dagen.jar $scriptDir/$jarName

    Remove-item -Recurse $buildDir -Force
}
else
{
    Write-Host "The dagen jar already exists, skipping its build."
}
