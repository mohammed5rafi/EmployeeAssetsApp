using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.interfaces
{
    public interface IAssetsRepository
       
{
    
        void Update(Assets assets);

        Task<bool> SaveAllAsync();

        Task<IEnumerable<Assets>> GetAssetsAsync();

        Task<Assets> GetAssetsByIdAsync(int id);
        Task<Assets> GetAssetsByAsync(string name);
         Task<IEnumerable<AssetsCategory>> GetAssetsCategoryAsync();
}
    
    }
