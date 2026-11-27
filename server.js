http.serve({ port: 3000 }, (url, method, body) => {
      const u = new URL(url, "http://localhost");

      if (u.pathname === "/secrets-test") {
        const ciReport = fs.exists("/app/ci_check.json")
          ? JSON.parse(fs.readFile("/app/ci_check.json"))
          : null;

        const cdSecret = process.env.CD_SECRET || "";

        return Response.json({
          ci_phase: ciReport,
          cd_phase: {
            cd_secret_present_in_cd: cdSecret.length > 0,
            cd_secret_preview: cdSecret ? cdSecret.slice(0, 10) + "..." : null,
            ci_secret_leaked_into_cd: Boolean(process.env.CI_SECRET),
          },
          spiffe_mtls: {
            enabled_in_ram: fs.exists("/run/anzar/tls/cert.pem"),
            files: {
              cert_pem: fs.exists("/run/anzar/tls/cert.pem"),
              key_pem: fs.exists("/run/anzar/tls/key.pem"),
              ca_pem: fs.exists("/run/anzar/tls/ca.pem"),
            },
          },
        });
      }

      return new Response("ff-demo running", { status: 200 });
    });
