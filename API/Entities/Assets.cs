using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{

    [Table("mstAssets")]
    public class Assets
    {
        
    public int Id { get; set; }

    public string Name { get; set; }
    public DateTime Purchase_Date { get; set; }    

    public ICollection<Photo> Photos {get;set;} 
    public decimal Amount { get; set; }
    }


}