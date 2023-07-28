using GymParkAppWeb.Database;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<UserDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("sqlconnectionstring")));// Configure the HTTP request pipeline.
builder.Services.AddDbContext<MembershipDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("sqlconnectionstring")));
builder.Services.AddDbContext<SessionDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("sqlconnectionstring")));
builder.Services.AddCors((CorsOptions) =>
{
    CorsOptions.AddPolicy("Mypolicy", (policyoptions) =>
    {
        policyoptions.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("Mypolicy");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
