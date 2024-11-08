using SellerService.DTO;
using DataBusiness_.Models;
using Microsoft.EntityFrameworkCore;
using SellerService.DAO;
using SellerService.Repository;

namespace SellerService;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins", builder =>
                builder.AllowAnyOrigin()  // Cho phép tất cả các nguồn
                       .AllowAnyMethod()  // Cho phép tất cả các phương thức HTTP (GET, POST, PUT, DELETE, v.v.)
                       .AllowAnyHeader());  // Cho phép tất cả các header
        });
        builder.Services.AddControllers();
        builder.Services.AddDbContext<EBayContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("MyCnn"));
        });
        builder.Services.AddScoped<SellerDAO>();
        builder.Services.AddScoped<SellerRepository>();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        var app = builder.Build();
        app.UseCors("AllowAllOrigins");
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseAuthorization();


        app.MapControllers();

        app.Run();
    }
}
