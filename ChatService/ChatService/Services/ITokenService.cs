using ChatService.Models;
using Microsoft.AspNetCore.Identity;

namespace ChatService.Services
{
    public interface ITokenService
    {
        string CreateToken(User user, List<IdentityRole<long>> role);

    };

}
