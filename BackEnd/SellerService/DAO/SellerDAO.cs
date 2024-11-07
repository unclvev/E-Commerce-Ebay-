using SellerService.DTO;
using SellerService.Repository;

namespace SellerService.DAO
{
    public class SellerDAO
    {
        private readonly SellerRepository _sellerRepository;
        public SellerDAO(SellerRepository sellerRepository)
        {
            this._sellerRepository = sellerRepository;
        }
        public async Task<List<SellerListingResponseDTO>> GetAllSellerListingsAsync()
        {
            return await _sellerRepository.GetAllSellerListingsAsync();
        }
        public async Task<SellerListingResponseDTO?> GetSellerListingByIdAsync(string id)
        {
            return await _sellerRepository.GetSellerListingByIdAsync(id);
        }
        public async Task<SellerListingResponseDTO?> CreateSellerListingAsync(SellerListingResponseDTO sellerListing)
        {
            return await _sellerRepository.CreateSellerListingAsync(sellerListing);
        }
        public async Task<SellerListingResponseDTO?> UpdateSellerListingAsync(string id, SellerListingResponseDTO sellerListing)
        {
            return await _sellerRepository.UpdateSellerListingAsync(id, sellerListing);
        }
        public async Task<SellerListingResponseDTO?> DeleteSellerListingAsync(string id)
        {
            return await _sellerRepository.DeleteSellerListingAsync(id);
        }
    }
}
