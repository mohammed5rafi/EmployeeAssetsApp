using Microsoft.Extensions.DependencyInjection;

namespace Api.Middleware
{
    public static class Cors
    {
        public static void ConfigureCorsService(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("ApiCorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                );
            });
        }
    }
}