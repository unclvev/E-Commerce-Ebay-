namespace SellerService.DTO
{
    public class ProductResponseDTO
    {
        public string Id { get; set; } = null!;
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? OriginalPrice { get; set; }
        public DateTime? SaleStartDate { get; set; }
        public DateTime? SaleEndDate { get; set; }
        public int? StockQuantity { get; set; }
    }
}
