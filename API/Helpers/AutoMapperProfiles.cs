using API.DTOs;
using API.Entities;
using AutoMapper;
using System.Linq;
namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
         CreateMap<Assets,AssetsDto>()
            .ForMember(dest => dest.PhotoUrl,opt =>opt.MapFrom(src =>src.Photos.FirstOrDefault().Url));
            CreateMap<Photo,PhotoDto>();
        }
    }
}