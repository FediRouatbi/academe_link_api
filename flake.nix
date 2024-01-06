{



  
  description = "A basic flake with nodejs, prisma, ncu and nest-cli ";
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  inputs.flake-utils.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodePackages_latest.nodejs
            pkgs.nodePackages_latest.pnpm
            pkgs.npm-check-updates
            pkgs.nest-cli
            pkgs.prisma-engines
            pkgs.openssl
          ];
          shellHook = with pkgs; ''
            export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-engines}/bin/schema-engine"
            export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
            export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
            export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
          '';
        };
      });
}
