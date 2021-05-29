using API.Data;
using API.interfaces;
using API.services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices( this IServiceCollection services,IConfiguration confiq){

            services.AddScoped<ITokenService,TokenService>();
            // services.AddScoped<IUserRepository,UserRepository>();
            // services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlServer(confiq.GetConnectionString("DefaultConnection"));
            });
            return services;
        }
    }
}