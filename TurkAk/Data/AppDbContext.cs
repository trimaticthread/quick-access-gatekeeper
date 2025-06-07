using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using TurkAk.Models;

namespace TurkAk.Data;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<CustomersCertificate> CustomersCertificates { get; set; }

    public virtual DbSet<Employee> Employee { get; set; }

    public virtual DbSet<NewDeviceType> NewDeviceTypes { get; set; }

    public virtual DbSet<ReferenceDeviceAdd> ReferenceDeviceAdds { get; set; }

    public virtual DbSet<TurkAkacc> TurkAkaccs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomersId).HasName("PK__Customer__F30A2A00E36176FD");

            entity.HasIndex(e => e.TaxNumber, "UQ__Customer__8A87F631294F42A0").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Customer__AB6E6164385178C3").IsUnique();

            entity.Property(e => e.CustomersId).HasColumnName("customers_id");
            entity.Property(e => e.AccountType)
                .HasMaxLength(8)
                .HasColumnName("account_type");
            entity.Property(e => e.BrandInfo).HasColumnName("brand_info");
            entity.Property(e => e.City)
                .HasMaxLength(20)
                .HasColumnName("city");
            entity.Property(e => e.Country)
                .HasMaxLength(20)
                .HasColumnName("country");
            entity.Property(e => e.CustomersAddress).HasColumnName("customers_address");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Files)
                .HasMaxLength(40)
                .HasColumnName("files");
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(255)
                .HasColumnName("phone_number");
            entity.Property(e => e.TaxNumber)
                .HasMaxLength(255)
                .HasColumnName("tax_number");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.Website)
                .HasMaxLength(255)
                .HasColumnName("website");
        });

        modelBuilder.Entity<CustomersCertificate>(entity =>
        {
            entity.HasKey(e => e.CertificateId).HasName("PK__Customer__E2256D319E802FAF");

            entity.HasIndex(e => e.CalibratorEmployee, "IX_CustomersCertificates_calibrator_employee");

            entity.HasIndex(e => e.Customer, "IX_CustomersCertificates_customer");

            entity.HasIndex(e => e.DeviceType, "IX_CustomersCertificates_device_type");

            entity.HasIndex(e => e.ReferenceCalibrator, "IX_CustomersCertificates_reference_calibrator");

            entity.Property(e => e.CertificateId).HasColumnName("certificate_id");
            entity.Property(e => e.CalibratorDate)
                .HasColumnType("datetime")
                .HasColumnName("calibrator_date");
            entity.Property(e => e.CalibratorEmployee).HasColumnName("calibrator_employee");
            entity.Property(e => e.CalibratorLocation)
                .HasMaxLength(30)
                .HasColumnName("calibrator_location");
            entity.Property(e => e.Customer).HasColumnName("customer");
            entity.Property(e => e.DeviceSerialNo)
                .HasMaxLength(30)
                .HasColumnName("device_serial_no");
            entity.Property(e => e.DeviceType).HasColumnName("device_type");
            entity.Property(e => e.FirstAirDate)
                .HasColumnType("datetime")
                .HasColumnName("first_air_date");
            entity.Property(e => e.ReferenceCalibrator).HasColumnName("reference_calibrator");
            entity.Property(e => e.ReferenceCalibratorSerialNo).HasColumnName("reference_calibrator_serial_no");
            entity.Property(e => e.RevisionDate)
                .HasColumnType("datetime")
                .HasColumnName("revision_date");
            entity.Property(e => e.RevisionNote)
                .HasMaxLength(255)
                .HasColumnName("revision_note");

            entity.HasOne(d => d.CalibratorEmployeeNavigation).WithMany(p => p.CustomersCertificates)
                .HasForeignKey(d => d.CalibratorEmployee)
                .HasConstraintName("FK__Customers__calib__49C3F6B7");

            entity.HasOne(d => d.CustomerNavigation).WithMany(p => p.CustomersCertificates)
                .HasForeignKey(d => d.Customer)
                .HasConstraintName("FK__Customers__custo__46E78A0C");

            entity.HasOne(d => d.DeviceTypeNavigation).WithMany(p => p.CustomersCertificates)
                .HasForeignKey(d => d.DeviceType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Customers__devic__47DBAE45");

            entity.HasOne(d => d.ReferenceCalibratorNavigation).WithMany(p => p.CustomersCertificates)
                .HasForeignKey(d => d.ReferenceCalibrator)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Customers__refer__48CFD27E");
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__Employee__C52E0BA8000C63BC");

            entity.ToTable("Employee");

            entity.HasIndex(e => e.EmployeeUserName, "UQ__Employee__0D5A3362AA1D4CF5").IsUnique();

            entity.Property(e => e.EmployeeId).HasColumnName("employee_id");
            entity.Property(e => e.EmployeeNameSurname)
                .HasMaxLength(50)
                .HasColumnName("employee_name_surname");
            entity.Property(e => e.EmployeePassword)
                .HasMaxLength(255)
                .HasColumnName("employee_password");
            entity.Property(e => e.EmployeeRole)
                .HasMaxLength(30)
                .HasColumnName("employee_role");
            entity.Property(e => e.EmployeeStatus)
                .HasDefaultValue(true)
                .HasColumnName("employee_status");
            entity.Property(e => e.EmployeeUserName)
                .HasMaxLength(30)
                .HasColumnName("employee_user_name");
        });

        modelBuilder.Entity<NewDeviceType>(entity =>
        {
            entity.HasKey(e => e.NewDeviceTypeId).HasName("PK__NewDevic__F7DD159BC7CFEEE9");

            entity.ToTable("NewDeviceType");

            entity.HasIndex(e => e.ReferenceCalibrator, "IX_NewDeviceType_reference_calibrator");

            entity.Property(e => e.NewDeviceTypeId).HasColumnName("new_device_type_id");
            entity.Property(e => e.DeviceTypeComment).HasColumnName("device_type_comment");
            entity.Property(e => e.DeviceTypeName)
                .HasMaxLength(30)
                .HasColumnName("device_type_name");
            entity.Property(e => e.ReferenceCalibrator).HasColumnName("reference_calibrator");

            entity.HasOne(d => d.ReferenceCalibratorNavigation).WithMany(p => p.NewDeviceTypes)
                .HasForeignKey(d => d.ReferenceCalibrator)
                .HasConstraintName("FK__NewDevice__refer__3C69FB99");
        });

        modelBuilder.Entity<ReferenceDeviceAdd>(entity =>
        {
            entity.HasKey(e => e.ReferenceDeviceId).HasName("PK__Referenc__AFD3770913A9EC86");

            entity.ToTable("ReferenceDeviceAdd");

            entity.HasIndex(e => e.SerialNo, "UQ__Referenc__E545819271FBC952").IsUnique();

            entity.Property(e => e.ReferenceDeviceId).HasColumnName("reference_device_id");
            entity.Property(e => e.Comment).HasColumnName("comment");
            entity.Property(e => e.DeviceType)
                .HasMaxLength(30)
                .HasColumnName("device_type");
            entity.Property(e => e.LastCalibratorDate)
                .HasColumnType("datetime")
                .HasColumnName("last_calibrator_date");
            entity.Property(e => e.NextCalibratorDate)
                .HasColumnType("datetime")
                .HasColumnName("next_calibrator_date");
            entity.Property(e => e.ReferenceDeviceName)
                .HasMaxLength(30)
                .HasColumnName("reference_device_name");
            entity.Property(e => e.SerialNo)
                .HasMaxLength(30)
                .HasColumnName("serial_no");
            entity.Property(e => e.Status)
                .HasDefaultValue(true)
                .HasColumnName("status");
        });

        modelBuilder.Entity<TurkAkacc>(entity =>
        {
            entity.HasKey(e => e.TurkakAccId).HasName("PK__TurkAKAc__2E3FEC7A93186D48");

            entity.ToTable("TurkAKAcc");

            entity.Property(e => e.TurkakAccId).HasColumnName("turkak_acc_id");
            entity.Property(e => e.Token).HasColumnName("token");
            entity.Property(e => e.TokenExpiry)
                .HasColumnType("datetime")
                .HasColumnName("token_expiry");
            entity.Property(e => e.TurkakAccPassword).HasColumnName("turkak_acc_password");
            entity.Property(e => e.TurkakAccUserName)
                .HasMaxLength(30)
                .HasColumnName("turkak_acc_user_name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
