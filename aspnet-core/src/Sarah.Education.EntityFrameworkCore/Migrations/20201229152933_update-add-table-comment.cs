using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sarah.Education.Migrations
{
    public partial class updateaddtablecomment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isPaid",
                table: "TimeSheetEntryStudent",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ActiveFrom",
                table: "CourseFee",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProtectorStudentComment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProtectorStudentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CommentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProtectorStudentComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProtectorStudentComment_ProtectorStudent_ProtectorStudentId",
                        column: x => x.ProtectorStudentId,
                        principalTable: "ProtectorStudent",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProtectorStudentComment_ProtectorStudentId",
                table: "ProtectorStudentComment",
                column: "ProtectorStudentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProtectorStudentComment");

            migrationBuilder.DropColumn(
                name: "isPaid",
                table: "TimeSheetEntryStudent");

            migrationBuilder.DropColumn(
                name: "ActiveFrom",
                table: "CourseFee");
        }
    }
}
