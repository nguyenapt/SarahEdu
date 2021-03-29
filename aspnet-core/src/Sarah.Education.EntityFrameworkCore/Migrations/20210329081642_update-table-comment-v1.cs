using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Sarah.Education.Migrations
{
    public partial class updatetablecommentv1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProtectorStudentComment_Protector_ProtectorId",
                table: "ProtectorStudentComment");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProtectorId",
                table: "ProtectorStudentComment",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_ProtectorStudentComment_Protector_ProtectorId",
                table: "ProtectorStudentComment",
                column: "ProtectorId",
                principalTable: "Protector",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProtectorStudentComment_Protector_ProtectorId",
                table: "ProtectorStudentComment");

            migrationBuilder.AlterColumn<Guid>(
                name: "ProtectorId",
                table: "ProtectorStudentComment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProtectorStudentComment_Protector_ProtectorId",
                table: "ProtectorStudentComment",
                column: "ProtectorId",
                principalTable: "Protector",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
