using Microsoft.EntityFrameworkCore;
using potluck_backend_dotnet.Data;
using potluck_backend_dotnet.Models;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PotluckProjectDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PotluckProject") ?? throw new InvalidOperationException("Connection string 'PotluckProject' not found.")));


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle                     
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();
app.UseCors("CorsPolicy");

app.MapControllers();

app.Run();
