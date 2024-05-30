$cwd = Get-Location
$baseDir = "$cwd/src/PC/Workbench/components/SaaSUncertain"

$outputFilePath = Join-Path -Path $PSScriptRoot -ChildPath "output.txt"
$scriptFilePath = Join-Path -Path $PSScriptRoot -ChildPath "analyze.ts"

Write-Output $outputFilePath

Write-Output "Current Workspace Directory: $baseDir"

# # 将上面的输出写入文件并指定 utf-8 编码
oxlint --format github | Out-File -FilePath $outputFilePath -Encoding utf8

npx ts-node $scriptFilePath

Write-Output "Generate Success"
