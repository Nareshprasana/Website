$baseUrl = "http://localhost:8080/api/auth"
$testUser = @{
    username = "debuguser"
    email = "debuguser@example.com"
    password = "debugpassword123"
}

# 1. Add User
Write-Host "Adding user..."
try {
    $addResponse = Invoke-RestMethod -Uri "$baseUrl/adduser" -Method Post -Body ($testUser | ConvertTo-Json) -ContentType "application/json"
    Write-Host "Add User Response: $($addResponse | ConvertTo-Json -Depth 5)"
} catch {
    Write-Host "Add User Failed: $_"
    Write-Host $_.Exception.Response.GetResponseStream() 
}

# 2. Login
Write-Host "`nLogging in..."
$loginBody = @{
    username = "debuguser"
    password = "debugpassword123"
}
try {
    $loginResponse = Invoke-RestMethod -Uri "$baseUrl/login" -Method Post -Body ($loginBody | ConvertTo-Json) -ContentType "application/json"
    Write-Host "Login Response: $($loginResponse | ConvertTo-Json -Depth 5)"
} catch {
    Write-Host "Login Failed: $_"
}
