using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{  
    [Table("mstAssetsCategory")]
    public class AssetsCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Assets assets { get; set; }
    }
}