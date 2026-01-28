# 导航栏和页脚验证脚本
# 用于快速检查所有HTML文件的导航栏和页脚

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  导航栏和页脚验证工具" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$htmlFiles = Get-ChildItem -Path "src" -Filter "*.html" | Where-Object { $_.Name -ne "login.html" }

$results = @()

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # 检查导航栏链接
    $navLinks = @(
        "学习路径",
        "学习资源",
        "竞赛赛程",
        "实验室介绍",
        "报名与联系"
    )
    
    $navCount = 0
    $missingNav = @()
    
    foreach ($link in $navLinks) {
        if ($content -match $link) {
            $navCount++
        } else {
            $missingNav += $link
        }
    }
    
    # 检查页脚
    $hasFooter = $content -match '<footer'
    $hasFullFooter = $content -match '快速链接' -and $content -match '竞赛平台'
    
    # 检查文件大小
    $fileSize = $file.Length
    $isComplete = $fileSize -gt 5000  # 假设完整文件应该大于5KB
    
    $result = [PSCustomObject]@{
        FileName = $file.Name
        NavLinks = $navCount
        MissingNav = ($missingNav -join ", ")
        HasFooter = $hasFooter
        HasFullFooter = $hasFullFooter
        FileSize = [math]::Round($fileSize / 1KB, 2)
        IsComplete = $isComplete
    }
    
    $results += $result
}

# 显示结果
Write-Host "检查结果：" -ForegroundColor Yellow
Write-Host ""

foreach ($result in $results) {
    Write-Host "文件: $($result.FileName)" -ForegroundColor White
    
    # 导航栏检查
    if ($result.NavLinks -eq 5) {
        Write-Host "  ✓ 导航栏: 完整 (5/5)" -ForegroundColor Green
    } elseif ($result.NavLinks -ge 3) {
        Write-Host "  ⚠ 导航栏: 不完整 ($($result.NavLinks)/5)" -ForegroundColor Yellow
        if ($result.MissingNav) {
            Write-Host "    缺少: $($result.MissingNav)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ✗ 导航栏: 严重缺失 ($($result.NavLinks)/5)" -ForegroundColor Red
    }
    
    # 页脚检查
    if ($result.HasFullFooter) {
        Write-Host "  ✓ 页脚: 完整" -ForegroundColor Green
    } elseif ($result.HasFooter) {
        Write-Host "  ⚠ 页脚: 存在但不完整" -ForegroundColor Yellow
    } else {
        Write-Host "  ✗ 页脚: 缺失" -ForegroundColor Red
    }
    
    # 文件大小检查
    if ($result.IsComplete) {
        Write-Host "  ✓ 文件大小: $($result.FileSize) KB" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ 文件大小: $($result.FileSize) KB (可能不完整)" -ForegroundColor Yellow
    }
    
    Write-Host ""
}

# 统计
$completeNav = ($results | Where-Object { $_.NavLinks -eq 5 }).Count
$completeFooter = ($results | Where-Object { $_.HasFullFooter }).Count
$total = $results.Count

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "统计信息：" -ForegroundColor Cyan
Write-Host "  总文件数: $total" -ForegroundColor White
Write-Host "  导航栏完整: $completeNav / $total" -ForegroundColor $(if ($completeNav -eq $total) { "Green" } else { "Yellow" })
Write-Host "  页脚完整: $completeFooter / $total" -ForegroundColor $(if ($completeFooter -eq $total) { "Green" } else { "Yellow" })
Write-Host "========================================" -ForegroundColor Cyan

# 生成报告
$reportPath = "navigation-verification-report.txt"
$results | Format-Table -AutoSize | Out-File $reportPath -Encoding UTF8
Write-Host ""
Write-Host "详细报告已保存到: $reportPath" -ForegroundColor Green
