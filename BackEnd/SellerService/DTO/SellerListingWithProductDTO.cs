namespace SellerService.DTO
{
    public class SellerListingWithProductDTO
    {
        public SellerListingResponseDTO SellerListing { get; set; } = null!;
        public ProductResponseDTO Product { get; set; } = null!;
    }

}
