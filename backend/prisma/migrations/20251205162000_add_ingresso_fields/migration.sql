/*
  Warnings:

  - Added the required column `assentoNumero` to the `ingressos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailComprador` to the `ingressos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeComprador` to the `ingressos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ingressos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessaoId" TEXT NOT NULL,
    "usuarioId" TEXT,
    "nomeComprador" TEXT NOT NULL,
    "emailComprador" TEXT NOT NULL,
    "assentoNumero" TEXT NOT NULL,
    "tipoBilhete" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "statusPagamento" TEXT NOT NULL DEFAULT 'PENDENTE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ingressos_sessaoId_fkey" FOREIGN KEY ("sessaoId") REFERENCES "sessoes" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ingressos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ingressos" ("createdAt", "id", "preco", "sessaoId", "statusPagamento", "tipoBilhete", "updatedAt", "usuarioId") SELECT "createdAt", "id", "preco", "sessaoId", "statusPagamento", "tipoBilhete", "updatedAt", "usuarioId" FROM "ingressos";
DROP TABLE "ingressos";
ALTER TABLE "new_ingressos" RENAME TO "ingressos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
