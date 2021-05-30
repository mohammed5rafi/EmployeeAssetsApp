using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.Entities
{
    public class Photo
    {

        public int Id { get; set; }
        public string Url  { get; set; }
        public Assets assets { get; set; }


    }
}