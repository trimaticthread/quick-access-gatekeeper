using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TurkAk.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    customers_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tax_number = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    brand_info = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    customers_address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    phone_number = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    website = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    country = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    city = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    files = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    account_type = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__F30A2A00E36176FD", x => x.customers_id);
                });

            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    employee_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    employee_name_surname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    employee_user_name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    employee_password = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    employee_role = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    employee_status = table.Column<bool>(type: "bit", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__C52E0BA8000C63BC", x => x.employee_id);
                });

            migrationBuilder.CreateTable(
                name: "ReferenceDeviceAdd",
                columns: table => new
                {
                    reference_device_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    reference_device_name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    serial_no = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    device_type = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    status = table.Column<bool>(type: "bit", nullable: false, defaultValue: true),
                    last_calibrator_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    next_calibrator_date = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Referenc__AFD3770913A9EC86", x => x.reference_device_id);
                });

            migrationBuilder.CreateTable(
                name: "TurkAKAcc",
                columns: table => new
                {
                    turkak_acc_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    turkak_acc_user_name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    turkak_acc_password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    token_expiry = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__TurkAKAc__2E3FEC7A93186D48", x => x.turkak_acc_id);
                });

            migrationBuilder.CreateTable(
                name: "NewDeviceType",
                columns: table => new
                {
                    new_device_type_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    device_type_name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    device_type_comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    reference_calibrator = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__NewDevic__F7DD159BC7CFEEE9", x => x.new_device_type_id);
                    table.ForeignKey(
                        name: "FK__NewDevice__refer__3C69FB99",
                        column: x => x.reference_calibrator,
                        principalTable: "ReferenceDeviceAdd",
                        principalColumn: "reference_device_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CustomersCertificates",
                columns: table => new
                {
                    certificate_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    customer = table.Column<int>(type: "int", nullable: false),
                    device_type = table.Column<int>(type: "int", nullable: false),
                    device_serial_no = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    reference_calibrator = table.Column<int>(type: "int", nullable: false),
                    reference_calibrator_serial_no = table.Column<int>(type: "int", nullable: false),
                    calibrator_employee = table.Column<int>(type: "int", nullable: false),
                    calibrator_location = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    calibrator_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    first_air_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    revision_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    revision_note = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__E2256D319E802FAF", x => x.certificate_id);
                    table.ForeignKey(
                        name: "FK__Customers__calib__49C3F6B7",
                        column: x => x.calibrator_employee,
                        principalTable: "Employee",
                        principalColumn: "employee_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Customers__custo__46E78A0C",
                        column: x => x.customer,
                        principalTable: "Customers",
                        principalColumn: "customers_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Customers__devic__47DBAE45",
                        column: x => x.device_type,
                        principalTable: "NewDeviceType",
                        principalColumn: "new_device_type_id");
                    table.ForeignKey(
                        name: "FK__Customers__refer__48CFD27E",
                        column: x => x.reference_calibrator,
                        principalTable: "ReferenceDeviceAdd",
                        principalColumn: "reference_device_id");
                });

            migrationBuilder.CreateIndex(
                name: "UQ__Customer__8A87F631294F42A0",
                table: "Customers",
                column: "tax_number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Customer__AB6E6164385178C3",
                table: "Customers",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomersCertificates_calibrator_employee",
                table: "CustomersCertificates",
                column: "calibrator_employee");

            migrationBuilder.CreateIndex(
                name: "IX_CustomersCertificates_customer",
                table: "CustomersCertificates",
                column: "customer");

            migrationBuilder.CreateIndex(
                name: "IX_CustomersCertificates_device_type",
                table: "CustomersCertificates",
                column: "device_type");

            migrationBuilder.CreateIndex(
                name: "IX_CustomersCertificates_reference_calibrator",
                table: "CustomersCertificates",
                column: "reference_calibrator");

            migrationBuilder.CreateIndex(
                name: "UQ__Employee__0D5A3362AA1D4CF5",
                table: "Employee",
                column: "employee_user_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NewDeviceType_reference_calibrator",
                table: "NewDeviceType",
                column: "reference_calibrator");

            migrationBuilder.CreateIndex(
                name: "UQ__Referenc__E545819271FBC952",
                table: "ReferenceDeviceAdd",
                column: "serial_no",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomersCertificates");

            migrationBuilder.DropTable(
                name: "TurkAKAcc");

            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "NewDeviceType");

            migrationBuilder.DropTable(
                name: "ReferenceDeviceAdd");
        }
    }
}
