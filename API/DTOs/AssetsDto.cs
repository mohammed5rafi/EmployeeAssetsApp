using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class AssetsDto
    {
        
        public int Id { get; set; }
       
        public string PhotoUrl { get; set; }

        public string Name { get; set; }
        public DateTime Purchase_Date { get; set; }    
        public ICollection<PhotoDto> Photos {get;set;}
         public decimal Amount { get; set; }
    }
}