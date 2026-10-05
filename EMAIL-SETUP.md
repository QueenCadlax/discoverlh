# Business submission email setup

The List Your Business form sends submissions server-side through Resend to `sales@discover.lowveldhub.co.za`. No database or Supabase project is required.

Before enabling submissions:

1. Configure a Resend account and verify a sending domain you control.
2. Set `RESEND_API_KEY` in the server environment.
3. Set `BUSINESS_SUBMISSIONS_FROM` to a sender using the verified domain, for example `Discover by Lowveld Hub <listings@your-verified-domain.example>`.
4. Redeploy/restart the server and submit a test request. Confirm receipt at `sales@discover.lowveldhub.co.za`.

Keep both values server-side. Do not use a `VITE_` prefix or commit credentials. The form reports success only after Resend accepts the email request; final inbox delivery should be confirmed with a test submission.
