using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AssetsRepository : IAssetsRepository
    {
        private readonly DataContext _context;
        public AssetsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Assets>> GetAssetsAsync()
        {
           return await _context.Assets
            .Include(p=> p.Photos )
            .ToListAsync();
        }

        public async Task<Assets> GetAssetsByAsync(string name)
        {
                return await _context.Assets

            .Include(p=> p.Photos )
            .SingleOrDefaultAsync(x => x.Name==name);
        }

        public async Task<Assets> GetAssetsByIdAsync(int id)
        {
            return await _context.Assets.FindAsync(id);
        }

        public async Task<IEnumerable<AssetsCategory>> GetAssetsCategoryAsync()
        {
          return await _context.AssetsCategory.ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public  void Update(Assets assets)
        {
             _context.Entry(assets).State = EntityState.Modified;
        }
    }
}