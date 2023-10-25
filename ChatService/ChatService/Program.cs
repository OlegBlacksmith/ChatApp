using ChatService;
using ChatService.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddSingleton<IDictionary<string, UserConnection>>
        (opts => new Dictionary<string, UserConnection>());

builder.Services.AddSignalR();

var app = builder.Build();

app.UseRouting();

app.UseCors();

app.UseEndpoints(endpoints => 
{
    endpoints.MapHub<ChatHub>("/chat");
});

app.Run();
