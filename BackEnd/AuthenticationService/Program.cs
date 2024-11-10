using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using AuthenticationService.Utils;
using DataBusiness_.Models;
using APIGateWay.config;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
        builder.WithOrigins("http://localhost:3000")  // Chỉ định frontend cụ thể
               .AllowCredentials()  // Cho phép gửi cookies, header xác thực
               .AllowAnyMethod()  // Cho phép tất cả các phương thức HTTP
               .AllowAnyHeader());  // Cho phép tất cả các header
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<EbayContext>();


// Thêm dịch vụ session
builder.Services.AddDistributedMemoryCache();

//builder.Services.AddStackExchangeRedisCache(options =>
//{
//    options.Configuration = "localhost:5095";
//    options.InstanceName = "SampleInstance";
//});

builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(10); // Thời gian hết hạn cho session
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.None; // Cho phép cookies cross-origin
});

// Add JWT configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                builder.Configuration.GetSection("AppSetting:Token").Value!)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));


// Register Jwt utility as a service
builder.Services.AddScoped<Jwt>();
builder.Services.AddScoped<PasswordHandler>();
builder.Services.AddScoped<Email>();    
var app = builder.Build();
app.UseCors("AllowAllOrigins");
app.UseSession();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
