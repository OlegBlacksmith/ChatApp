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

//app.UseAuthentication ();

app.UseRouting();

app.UseCors();

app.MapHub<ChatHub>("/chat");

//app.UseAuthorization();

app.Run();
