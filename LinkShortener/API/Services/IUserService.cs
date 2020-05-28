using LinkShortener.API.Models;
using System.Collections.Generic;

namespace LinkShortener.API.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
    }
}
