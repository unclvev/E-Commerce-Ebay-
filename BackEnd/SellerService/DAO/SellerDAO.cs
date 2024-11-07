using SellerService.DTO;
using SellerService.Repository;

namespace SellerService.DAO
{
    public class SellerDAO
    {
        //List
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
        public async Task<List<SellerListingResponseDTO>> GetListingsBySellerIdAsync(string sellerId)
        {
            return await _sellerRepository.GetListingsBySellerIdAsync(sellerId);
        }

        //ManageOrders
        public async Task<List<OrderResponseDTO>> GetAllOrdersAsync()
        {
            return await _sellerRepository.GetAllOrdersAsync();
        }

        public async Task<OrderResponseDTO?> GetOrderByIdAsync(string id)
        {
            return await _sellerRepository.GetOrderByIdAsync(id);
        }

        public async Task<List<OrderItemResponseDTO>> GetOrderItemsByOrderIdAsync(string orderId)
        {
            return await _sellerRepository.GetOrderItemsByOrderIdAsync(orderId);
        }

        public async Task<OrderResponseDTO?> UpdateOrderAsync(string id, OrderResponseDTO orderUpdate)
        {
            return await _sellerRepository.UpdateOrderAsync(id, orderUpdate);
        }

        public async Task<bool?> DeleteOrderAsync(string id)
        {
            return await _sellerRepository.DeleteOrderAsync(id);
        }
    }
}
