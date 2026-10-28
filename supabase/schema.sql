-- ========================================================
-- KIIT SOCIETYDEX — SUPABASE POSTGRESQL SCHEMA
-- Maintained by: Fullstack Engineering Team
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Societies Table
CREATE TABLE IF NOT EXISTS public.societies (
    id VARCHAR(10) PRIMARY KEY,
    dex_number VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(120) NOT NULL,
    logo_emoji VARCHAR(20) DEFAULT '🏛️',
    domain VARCHAR(60) NOT NULL,
    types TEXT[] NOT NULL,
    description TEXT NOT NULL,
    founded_year INTEGER DEFAULT 2015,
    coordinator VARCHAR(80),
    recruitment_status VARCHAR(20) DEFAULT 'Closed',
    contact_email VARCHAR(120),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index on dex_number and domain
CREATE INDEX IF NOT EXISTS idx_societies_dex ON public.societies(dex_number);
CREATE INDEX IF NOT EXISTS idx_societies_domain ON public.societies(domain);

-- 2. Society Stats Table (Pokémon-style stat bars)
CREATE TABLE IF NOT EXISTS public.society_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    society_id VARCHAR(10) REFERENCES public.societies(id) ON DELETE CASCADE,
    activity INTEGER CHECK (activity BETWEEN 0 AND 100),
    events INTEGER CHECK (events BETWEEN 0 AND 100),
    community INTEGER CHECK (community BETWEEN 0 AND 100),
    innovation INTEGER CHECK (innovation BETWEEN 0 AND 100),
    technical_skill INTEGER CHECK (technical_skill BETWEEN 0 AND 100),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. User Profiles Table (Supabase Auth linked)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL,
    roll_number VARCHAR(20),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Society Memberships / Bookmarks
CREATE TABLE IF NOT EXISTS public.society_bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    society_id VARCHAR(10) REFERENCES public.societies(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, society_id)
);

-- Row Level Security (RLS) Policies
ALTER TABLE public.societies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.society_stats ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all societies and stats
CREATE POLICY "Public societies are viewable by everyone." 
ON public.societies FOR SELECT USING (true);

CREATE POLICY "Public society stats are viewable by everyone." 
ON public.society_stats FOR SELECT USING (true);
