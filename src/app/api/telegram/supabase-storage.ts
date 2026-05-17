export type SupabaseUrlConfig =
  | { ok: true; baseUrl: string }
  | { ok: false; message: string };

export type SupabaseStorageUploadRequest =
  | {
      ok: true;
      uploadUrl: string;
      publicUrl: string;
      requestInit: RequestInit;
    }
  | { ok: false; message: string };

export function resolveSupabaseBaseUrl(rawUrl: string): SupabaseUrlConfig {
  let url: URL;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    return {
      ok: false,
      message: "❌ `SUPABASE_URL` tidak valid. Gunakan format `https://xxxx.supabase.co`.",
    };
  }

  if (url.pathname !== "/" && url.pathname !== "") {
    return {
      ok: false,
      message:
        "❌ `SUPABASE_URL` harus berupa base project URL, misalnya `https://xxxx.supabase.co` (tanpa `/rest/v1`).",
    };
  }

  return { ok: true, baseUrl: url.origin };
}

export function createSupabaseStorageUploadRequest({
  rawUrl,
  serviceKey,
  bucket,
  fileName,
  mimeType,
  body,
}: {
  rawUrl: string;
  serviceKey: string;
  bucket: string;
  fileName: string;
  mimeType: string;
  body: BodyInit;
}): SupabaseStorageUploadRequest {
  const supabaseUrl = resolveSupabaseBaseUrl(rawUrl);
  if (!supabaseUrl.ok) return supabaseUrl;

  const objectPath = `${bucket}/${fileName}`;

  return {
    ok: true,
    uploadUrl: `${supabaseUrl.baseUrl}/storage/v1/object/${objectPath}`,
    publicUrl: `${supabaseUrl.baseUrl}/storage/v1/object/public/${objectPath}`,
    requestInit: {
      method: "POST",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": mimeType,
        "x-upsert": "true",
      },
      body,
    },
  };
}
