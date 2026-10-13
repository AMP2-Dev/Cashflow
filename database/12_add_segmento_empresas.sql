-- ============================================================================
-- MIGRAÇÃO 12: Adicionar coluna 'segmento' na tabela empresas
-- Segmentos suportados: 'servicos', 'comercio', 'industria', 'misto'
-- ============================================================================
-- Execute no Supabase SQL Editor (supabase.com -> Projeto -> SQL Editor):

-- 1. Coluna de segmento de atuação da empresa com default 'misto'
ALTER TABLE public.empresas ADD COLUMN IF NOT EXISTS segmento text DEFAULT 'misto';

-- 2. Permissões explícitas de Data API
GRANT SELECT ON public.empresas TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.empresas TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.empresas TO service_role;

-- 3. Recarrega o cache do PostgREST imediatamente
NOTIFY pgrst, 'reload schema';
