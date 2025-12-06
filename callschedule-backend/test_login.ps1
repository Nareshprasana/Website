$baseUrl = "http://localhost:8080/api/auth"

# Login
Write-Host "Logging in..."
$loginBody = @{
    username = "debuguser"
    password = "debugpassword123"
}
try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/login" -Method Post -Body ($loginBody | ConvertTo-Json) -ContentType "application/json"
    Write-Host "Login Response: $($loginResponse | ConvertTo-Json -Depth 5)"
} catch {
    Write-Host "Login Failed: $_"
    if ($_.Exception.Response) {
         $reader = New-Object System.IO.StreamReader $_.Exception.Response.GetResponseStream()
         $responseBody = $reader.ReadToEnd()
         Write-Host "Error Body: $responseBody"
    }
}
