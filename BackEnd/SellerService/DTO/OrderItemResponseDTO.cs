namespace SellerService.DTO
{
    public class OrderItemResponseDTO
    {
        public string Id { get; set; } = null!;
        public string? OrderId { get; set; }
        public string? ProductId { get; set; }
        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
    }
}
