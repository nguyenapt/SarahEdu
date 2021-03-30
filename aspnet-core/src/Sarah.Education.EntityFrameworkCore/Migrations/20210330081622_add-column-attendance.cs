using Microsoft.EntityFrameworkCore.Migrations;

namespace Sarah.Education.Migrations
{
    public partial class addcolumnattendance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsNotPaid",
                table: "TimeSheetEntryStudent",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsNotPresent",
                table: "TimeSheetEntryStudent",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NotPaidDescription",
                table: "TimeSheetEntryStudent",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NotPresentDescription",
                table: "TimeSheetEntryStudent",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsNotPaid",
                table: "TimeSheetEntryStudent");

            migrationBuilder.DropColumn(
                name: "IsNotPresent",
                table: "TimeSheetEntryStudent");

            migrationBuilder.DropColumn(
                name: "NotPaidDescription",
                table: "TimeSheetEntryStudent");

            migrationBuilder.DropColumn(
                name: "NotPresentDescription",
                table: "TimeSheetEntryStudent");
        }
    }
}
