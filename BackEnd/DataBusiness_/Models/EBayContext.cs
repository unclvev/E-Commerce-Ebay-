using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace DataBusiness_.Models
{
    public partial class EbayContext : DbContext
    {
        public EbayContext()
        {
        }

        public EbayContext(DbContextOptions<EbayContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bid> Bids { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<CategoryListing> CategoryListings { get; set; } = null!;
        public virtual DbSet<Color> Colors { get; set; } = null!;
        public virtual DbSet<Inventory> Inventories { get; set; } = null!;
        public virtual DbSet<Listing> Listings { get; set; } = null!;
        public virtual DbSet<ListingBid> ListingBids { get; set; } = null!;
        public virtual DbSet<Material> Materials { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderItem> OrderItems { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<ProductImage> ProductImages { get; set; } = null!;
        public virtual DbSet<ProductListing> ProductListings { get; set; } = null!;
        public virtual DbSet<ProductReview> ProductReviews { get; set; } = null!;
        public virtual DbSet<ProductVariation> ProductVariations { get; set; } = null!;
        public virtual DbSet<Promotion> Promotions { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;
        public virtual DbSet<Size> Sizes { get; set; } = null!;
        public virtual DbSet<Store> Stores { get; set; } = null!;
        public virtual DbSet<StoreInventory> StoreInventories { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<UserBid> UserBids { get; set; } = null!;
        public virtual DbSet<UserListing> UserListings { get; set; } = null!;
        public virtual DbSet<UserOrder> UserOrders { get; set; } = null!;
        public virtual DbSet<UserReview> UserReviews { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer("server=DESKTOP-N81N3JT\\SA;database= Ebay;uid=sa;pwd=123");

            //            if (!optionsBuilder.IsConfigured)
            //{
            //    optionsBuilder.UseSqlServer("Server=tcp:ebayapi.database.windows.net,1433;Initial Catalog=Ebay;Persist Security Info=False;User ID=prn231;Password=Passaway1@;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            //}

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bid>(entity =>
            {
                entity.ToTable("Bid");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.BidAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.BidTime).HasColumnType("datetime");

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Listing)
                    .WithMany(p => p.Bids)
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__Bid__ListingId__6A30C649");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Bids)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Bid__UserId__45F365D3");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<CategoryListing>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("CategoryListing");

                entity.Property(e => e.CategoryId).HasMaxLength(50);

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.HasOne(d => d.Category)
                    .WithMany()
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__CategoryL__Categ__08B54D69");

                entity.HasOne(d => d.Listing)
                    .WithMany()
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__CategoryL__Listi__6477ECF3");
            });

            modelBuilder.Entity<Color>(entity =>
            {
                entity.ToTable("Color");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Inventory>(entity =>
            {
                entity.ToTable("Inventory");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Brand).HasMaxLength(255);

                entity.Property(e => e.Characteristic).HasMaxLength(255);

                entity.Property(e => e.Date).HasColumnType("datetime");

                entity.Property(e => e.ExportPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ImportPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Inventories)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Inventory__Produ__571DF1D5");
            });

            modelBuilder.Entity<Listing>(entity =>
            {
                entity.ToTable("Listing");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.CategoryId).HasMaxLength(50);

                entity.Property(e => e.CurrentPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.EndTime).HasColumnType("datetime");

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.Property(e => e.SellerId).HasMaxLength(50);

                entity.Property(e => e.StartPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.StartTime).HasColumnType("datetime");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Listings)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK__Listing__Categor__37A5467C");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Listings)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Listing__Product__35BCFE0A");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.Listings)
                    .HasForeignKey(d => d.SellerId)
                    .HasConstraintName("FK__Listing__SellerI__36B12243");
            });

            modelBuilder.Entity<ListingBid>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ListingBid");

                entity.Property(e => e.BidId).HasMaxLength(50);

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.HasOne(d => d.Bid)
                    .WithMany()
                    .HasForeignKey(d => d.BidId)
                    .HasConstraintName("FK__ListingBi__BidId__6E01572D");

                entity.HasOne(d => d.Listing)
                    .WithMany()
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__ListingBi__Listi__47DBAE45");
            });

            modelBuilder.Entity<Material>(entity =>
            {
                entity.ToTable("Material");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Order");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.OrderDate).HasColumnType("datetime");

                entity.Property(e => e.OrderStatus).HasMaxLength(50);

                entity.Property(e => e.ShippingAddress).HasMaxLength(255);

                entity.Property(e => e.TotalAmount).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Order__UserId__3A81B327");
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.ToTable("OrderItem");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.OrderId).HasMaxLength(50);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__OrderItem__Order__628FA481");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__OrderItem__Produ__3E52440B");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Product");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.OriginalPrice).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)");

                entity.Property(e => e.SaleEndDate).HasColumnType("datetime");

                entity.Property(e => e.SaleStartDate).HasColumnType("datetime");
                entity.HasMany(d => d.Colors)
                    .WithMany(p => p.Products)
                    .UsingEntity<Dictionary<string, object>>(
                        "ProductColor",
                        l => l.HasOne<Color>().WithMany().HasForeignKey("ColorId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__ProductCo__Color__72C60C4A"),
                        r => r.HasOne<Product>().WithMany().HasForeignKey("ProductId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__ProductCo__Produ__71D1E811"),
                        j =>
                        {
                            j.HasKey("ProductId", "ColorId").HasName("PK__ProductC__7CD6B0B9CDD76B64");
                            j.ToTable("ProductColor");
                            j.IndexerProperty<string>("ProductId").HasMaxLength(50);
                            j.IndexerProperty<string>("ColorId").HasMaxLength(50);
                        });
                entity.HasMany(d => d.Sizes)
                    .WithMany(p => p.Products)
                    .UsingEntity<Dictionary<string, object>>(
                        "ProductSize",
                        l => l.HasOne<Size>().WithMany().HasForeignKey("SizeId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__ProductSi__SizeI__6EF57B66"),
                        r => r.HasOne<Product>().WithMany().HasForeignKey("ProductId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__ProductSi__Produ__6E01572D"),
                        j =>
                        {
                            j.HasKey("ProductId", "SizeId").HasName("PK__ProductS__0C37165A54A9E987");
                            j.ToTable("ProductSize");
                            j.IndexerProperty<string>("ProductId").HasMaxLength(50);
                            j.IndexerProperty<string>("SizeId").HasMaxLength(50);
                        });
                entity.HasMany(d => d.Stores)
                    .WithMany(p => p.Products)
                    .UsingEntity<Dictionary<string, object>>(
                        "ProductStore",
                        l => l.HasOne<Store>().WithMany().HasForeignKey("StoreId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__ProductSt__Store__6B24EA82"),
                        r => r.HasOne<Product>().WithMany().HasForeignKey("ProductId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK__ProductSt__Produ__6A30C649"),
                        j =>
                        {
                            j.HasKey("ProductId", "StoreId").HasName("PK__ProductS__B7B4E9DD5820BCAD");
                            j.ToTable("ProductStore");
                            j.IndexerProperty<string>("ProductId").HasMaxLength(50);
                            j.IndexerProperty<string>("StoreId").HasMaxLength(50);
                        });
                
            });

            modelBuilder.Entity<ProductImage>(entity =>
            {
                entity.ToTable("ProductImage");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.ImageUrl).HasMaxLength(255);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductImages)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductIm__Produ__32E0915F");
            });

            modelBuilder.Entity<ProductListing>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ProductListing");

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Listing)
                    .WithMany()
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__ProductLi__Listi__619B8048");

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductLi__Produ__60A75C0F");
            });

            modelBuilder.Entity<ProductReview>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("ProductReview");

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.Property(e => e.ReviewId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany()
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductRe__Produ__66603565");

                entity.HasOne(d => d.Review)
                    .WithMany()
                    .HasForeignKey(d => d.ReviewId)
                    .HasConstraintName("FK__ProductRe__Revie__6754599E");
            });

            modelBuilder.Entity<ProductVariation>(entity =>
            {
                entity.ToTable("ProductVariation");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductVariations)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__ProductVa__Produ__300424B4");
            });

            modelBuilder.Entity<Promotion>(entity =>
            {
                entity.ToTable("Promotion");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.PrDescription).HasMaxLength(250);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Promotions)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Promotion__Produ__5EBF139D");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.ToTable("Review");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Comment).HasMaxLength(255);

                entity.Property(e => e.ProductId).HasMaxLength(50);

                entity.Property(e => e.Rating).HasColumnType("decimal(3, 2)");

                entity.Property(e => e.ReviewDate).HasColumnType("datetime");

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("FK__Review__ProductI__412EB0B6");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Review__UserId__4222D4EF");
            });

            modelBuilder.Entity<Size>(entity =>
            {
                entity.ToTable("Size");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.ToTable("Store");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.Name).HasMaxLength(255);

                entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            });

            modelBuilder.Entity<StoreInventory>(entity =>
            {
                entity.ToTable("StoreInventory");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.InventoryId).HasMaxLength(50);

                entity.HasOne(d => d.Inventory)
                    .WithMany(p => p.StoreInventories)
                    .HasForeignKey(d => d.InventoryId)
                    .HasConstraintName("FK__StoreInve__Inven__5BE2A6F2");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("User");

                entity.Property(e => e.Id).HasMaxLength(50);

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.FirstName).HasMaxLength(255);

                entity.Property(e => e.LastName).HasMaxLength(255);

                entity.Property(e => e.Otp)
                    .HasMaxLength(100)
                    .HasColumnName("OTP");

                entity.Property(e => e.Otpexpiry)
                    .HasColumnType("datetime")
                    .HasColumnName("OTPExpiry");

                entity.Property(e => e.Password).HasMaxLength(255);

                entity.Property(e => e.PhoneNumber).HasMaxLength(50);

                entity.Property(e => e.RefreshToken).HasMaxLength(100);

                entity.Property(e => e.RefreshTokenCreate).HasColumnType("datetime");

                entity.Property(e => e.RefreshTokenExpiryTime).HasColumnType("datetime");

                entity.Property(e => e.Roles).HasMaxLength(10);

                entity.Property(e => e.Username).HasMaxLength(255);
            });

            modelBuilder.Entity<UserBid>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UserBid");

                entity.Property(e => e.BidId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Bid)
                    .WithMany()
                    .HasForeignKey(d => d.BidId)
                    .HasConstraintName("FK__UserBid__BidId__797309D9");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserBid__UserId__534D60F1");
            });

            modelBuilder.Entity<UserListing>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UserListing");

                entity.Property(e => e.ListingId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Listing)
                    .WithMany()
                    .HasForeignKey(d => d.ListingId)
                    .HasConstraintName("FK__UserListi__Listi__4BAC3F29");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserListi__UserI__4AB81AF0");
            });

            modelBuilder.Entity<UserOrder>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UserOrder");

                entity.Property(e => e.OrderId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Order)
                    .WithMany()
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__UserOrder__Order__4E88ABD4");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserOrder__UserI__4D94879B");
            });

            modelBuilder.Entity<UserReview>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("UserReview");

                entity.Property(e => e.ReviewId).HasMaxLength(50);

                entity.Property(e => e.UserId).HasMaxLength(50);

                entity.HasOne(d => d.Review)
                    .WithMany()
                    .HasForeignKey(d => d.ReviewId)
                    .HasConstraintName("FK__UserRevie__Revie__5165187F");

                entity.HasOne(d => d.User)
                    .WithMany()
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__UserRevie__UserI__5070F446");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
