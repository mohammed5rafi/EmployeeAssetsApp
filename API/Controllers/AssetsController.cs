using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AssetsController : BaseApiController
    {


        private readonly IMapper _mapper;

        private readonly IAssetsRepository _assetsRepository;

        public AssetsController(IAssetsRepository assetsRepository, IMapper mapper)
        {
            _assetsRepository = assetsRepository;
            _mapper = mapper;
      

        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<AssetsDto>>> GetAssets()
        {
            var users = await _assetsRepository.GetAssetsAsync();

            var userToReturn = _mapper.Map<IEnumerable<AssetsDto>>(users);
            return Ok(userToReturn);


        }
        [HttpPost]

        public async Task<ActionResult<AssetsDto>> AddAssets(AssetsDto assetsDto){

            return Ok();

        }

        [HttpPut]
        public async Task<ActionResult<AssetsDto>> UpdateAssets(AssetsDto assetsDto){

            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AssetsDto>> DeleteAssets(int? id){

            return Ok();

        }
        [HttpGet("{name}")]
        public async Task<ActionResult<AssetsDto>> GetAssetsByName(string name)
        {
            var assets = await _assetsRepository.GetAssetsByAsync(name);
            return _mapper.Map<AssetsDto>(assets);
        }
    }
}