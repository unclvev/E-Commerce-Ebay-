using Microsoft.AspNetCore.Mvc;
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
        //Product
        public async Task<ProductResponseDTO?> GetProductByIdAsync(string id)
        {
            return await _sellerRepository.GetProductByIdAsync(id);
        }
        public async Task<ProductResponseDTO?> CreateProductAsync(ProductResponseDTO product)
        {
            return await _sellerRepository.CreateProductAsync(product);
        }
        public async Task<ProductResponseDTO?> DeleteProductAsync(string id)
        {
            return await _sellerRepository.DeleteProductAsync(id);
        }
        //List
        public async Task<List<SellerListingResponseDTO>> GetAllSellerListingsAsync()
        {
            return await _sellerRepository.GetAllSellerListingsAsync();
        }
        public async Task<SellerListingResponseDTO?> GetSellerListingByIdAsync(string id)
        {
            return await _sellerRepository.GetSellerListingByIdAsync(id);
        }
        public async Task<SellerListingResponseDTO?> CreateSellerListingAsync(SellerListingResponseDTO sellerListing, ProductResponseDTO product)
        {
            sellerListing.ProductId = product.Id;

            return await _sellerRepository.CreateSellerListingAsync(sellerListing, product);
        }

        public async Task<SellerListingResponseDTO?> UpdateSellerListingAsync(string id, SellerListingResponseDTO sellerListing)
        {
            return await _sellerRepository.UpdateSellerListingAsync(id, sellerListing);
        }
        public async Task<SellerListingResponseDTO?> DeleteSellerListingAsync(string id)
        {
            return await _sellerRepository.DeleteSellerListingAsync(id);
        }
        public async Task<List<SellerListingResponseDTO>> GetListingsBySellerEmailAsync(string sellerEmail)
        {
            return await _sellerRepository.GetListingsBySellerEmailAsync(sellerEmail);
        }
        public async Task<SellerListingResponseDTO> GetListingByProductIdAsync(string productId)
        {
            return await _sellerRepository.GetListingByProductIdAsync(productId);
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
        public async Task<OrderResponseDTO?> CalculateOrderAsync(string id, OrderResponseDTO orderUpdate)
        {
            return await _sellerRepository.CalculateOrderAsync(id, orderUpdate);
        }

        public async Task<bool?> DeleteOrderAsync(string id)
        {
            return await _sellerRepository.DeleteOrderAsync(id);
        }
        //Promotion
        //gọi các method trong repository
        public async Task<List<PromotionResponseDTO>> GetAllPromotionsAsync()
        {
            return await _sellerRepository.GetAllPromotionsAsync();
        }
        public async Task<List<PromotionResponseDTO>> GetPromotionsByProductIdAsync(string productId)
        {
            return await _sellerRepository.GetPromotionsByProductIdAsync(productId);
        }

        public async Task<PromotionResponseDTO> AddPromotionAsync(PromotionResponseDTO promotionDto)
        {
            return await _sellerRepository.AddPromotionAsync(promotionDto);
        }

        public async Task<PromotionResponseDTO?> UpdatePromotionAsync(string id, PromotionResponseDTO promotionDto)
        {
            return await _sellerRepository.UpdatePromotionAsync(id, promotionDto);
        }

        public async Task<bool> DeletePromotionAsync(string id)
        {
            return await _sellerRepository.DeletePromotionAsync(id);
        }
    }
}
