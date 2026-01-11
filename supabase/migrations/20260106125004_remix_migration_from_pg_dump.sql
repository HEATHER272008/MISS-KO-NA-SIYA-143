CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'user'
);


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: about_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.about_content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    history text,
    jhs_principal_history text,
    shs_principal_history text,
    mission_old text,
    mission_new text,
    vision_old text,
    vision_new text,
    core_values jsonb DEFAULT '[]'::jsonb,
    campus_map_url text,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: announcements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.announcements (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    date text NOT NULL,
    type text DEFAULT 'academic'::text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: contact_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.contact_info (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    address text,
    phone text,
    email text,
    office_hours text,
    google_maps_embed text,
    social_links jsonb DEFAULT '{}'::jsonb,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: enrollment_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.enrollment_content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    new_students_steps jsonb DEFAULT '[]'::jsonb,
    incoming_students_steps jsonb DEFAULT '[]'::jsonb,
    transferees_steps jsonb DEFAULT '[]'::jsonb,
    enrollment_dates text,
    entrance_exam_schedule text,
    start_of_classes text,
    contact_number text,
    notes text DEFAULT 'Dates are subject to change.'::text,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: historical_personnel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historical_personnel (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    "position" text NOT NULL,
    years text,
    photo_url text,
    category text NOT NULL,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: home_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.home_content (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    hero_title text NOT NULL,
    hero_subtitle text,
    hero_image_url text,
    why_choose_title text DEFAULT 'Why Choose BCSI?'::text NOT NULL,
    why_choose_items jsonb DEFAULT '[]'::jsonb,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: important_dates; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.important_dates (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    event text NOT NULL,
    date text NOT NULL,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: organization_members; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organization_members (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    organization_id uuid NOT NULL,
    name text NOT NULL,
    "position" text,
    photo_url text,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: organization_photos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organization_photos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    organization_id uuid NOT NULL,
    photo_url text NOT NULL,
    caption text,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: organizations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.organizations (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    type text NOT NULL,
    description text,
    teacher_in_charge text,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: personnel; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.personnel (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    "position" text NOT NULL,
    department text,
    description text,
    photo_url text,
    email text,
    phone text,
    display_order integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: programs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.programs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    details text,
    icon text,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: scholarship_application_info; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scholarship_application_info (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    how_to_apply text,
    requirements text,
    deadline_info text,
    contact_info text,
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: scholarships; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.scholarships (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text,
    eligibility text,
    discount_amount text,
    type text,
    is_active boolean DEFAULT true,
    display_order integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: about_content about_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.about_content
    ADD CONSTRAINT about_content_pkey PRIMARY KEY (id);


--
-- Name: announcements announcements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.announcements
    ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);


--
-- Name: contact_info contact_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.contact_info
    ADD CONSTRAINT contact_info_pkey PRIMARY KEY (id);


--
-- Name: enrollment_content enrollment_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.enrollment_content
    ADD CONSTRAINT enrollment_content_pkey PRIMARY KEY (id);


--
-- Name: historical_personnel historical_personnel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_personnel
    ADD CONSTRAINT historical_personnel_pkey PRIMARY KEY (id);


--
-- Name: home_content home_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.home_content
    ADD CONSTRAINT home_content_pkey PRIMARY KEY (id);


--
-- Name: important_dates important_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.important_dates
    ADD CONSTRAINT important_dates_pkey PRIMARY KEY (id);


--
-- Name: organization_members organization_members_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_members
    ADD CONSTRAINT organization_members_pkey PRIMARY KEY (id);


--
-- Name: organization_photos organization_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_photos
    ADD CONSTRAINT organization_photos_pkey PRIMARY KEY (id);


--
-- Name: organizations organizations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);


--
-- Name: personnel personnel_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.personnel
    ADD CONSTRAINT personnel_pkey PRIMARY KEY (id);


--
-- Name: programs programs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);


--
-- Name: scholarship_application_info scholarship_application_info_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scholarship_application_info
    ADD CONSTRAINT scholarship_application_info_pkey PRIMARY KEY (id);


--
-- Name: scholarships scholarships_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.scholarships
    ADD CONSTRAINT scholarships_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: about_content update_about_content_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: announcements update_announcements_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: contact_info update_contact_info_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON public.contact_info FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: enrollment_content update_enrollment_content_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_enrollment_content_updated_at BEFORE UPDATE ON public.enrollment_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: historical_personnel update_historical_personnel_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_historical_personnel_updated_at BEFORE UPDATE ON public.historical_personnel FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: home_content update_home_content_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_home_content_updated_at BEFORE UPDATE ON public.home_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: organizations update_organizations_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON public.organizations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: personnel update_personnel_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_personnel_updated_at BEFORE UPDATE ON public.personnel FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: programs update_programs_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_programs_updated_at BEFORE UPDATE ON public.programs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: scholarship_application_info update_scholarship_application_info_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_scholarship_application_info_updated_at BEFORE UPDATE ON public.scholarship_application_info FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: scholarships update_scholarships_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_scholarships_updated_at BEFORE UPDATE ON public.scholarships FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: organization_members organization_members_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_members
    ADD CONSTRAINT organization_members_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: organization_photos organization_photos_organization_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.organization_photos
    ADD CONSTRAINT organization_photos_organization_id_fkey FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: about_content Admins can manage about content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage about content" ON public.about_content USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: announcements Admins can manage announcements; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage announcements" ON public.announcements USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: contact_info Admins can manage contact info; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage contact info" ON public.contact_info USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: enrollment_content Admins can manage enrollment content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage enrollment content" ON public.enrollment_content USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: historical_personnel Admins can manage historical personnel; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage historical personnel" ON public.historical_personnel USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: home_content Admins can manage home content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage home content" ON public.home_content USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: important_dates Admins can manage important dates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage important dates" ON public.important_dates USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: organization_members Admins can manage organization members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage organization members" ON public.organization_members USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: organization_photos Admins can manage organization photos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage organization photos" ON public.organization_photos USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: organizations Admins can manage organizations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage organizations" ON public.organizations USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: personnel Admins can manage personnel; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage personnel" ON public.personnel USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: programs Admins can manage programs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage programs" ON public.programs USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: scholarship_application_info Admins can manage scholarship application info; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage scholarship application info" ON public.scholarship_application_info USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: scholarships Admins can manage scholarships; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage scholarships" ON public.scholarships USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: user_roles Admins can view all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: about_content Public can view about content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view about content" ON public.about_content FOR SELECT USING (true);


--
-- Name: announcements Public can view active announcements; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active announcements" ON public.announcements FOR SELECT USING ((is_active = true));


--
-- Name: historical_personnel Public can view active historical personnel; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active historical personnel" ON public.historical_personnel FOR SELECT USING ((is_active = true));


--
-- Name: important_dates Public can view active important dates; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active important dates" ON public.important_dates FOR SELECT USING ((is_active = true));


--
-- Name: organizations Public can view active organizations; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active organizations" ON public.organizations FOR SELECT USING ((is_active = true));


--
-- Name: personnel Public can view active personnel; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active personnel" ON public.personnel FOR SELECT USING ((is_active = true));


--
-- Name: programs Public can view active programs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active programs" ON public.programs FOR SELECT USING ((is_active = true));


--
-- Name: scholarships Public can view active scholarships; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active scholarships" ON public.scholarships FOR SELECT USING ((is_active = true));


--
-- Name: contact_info Public can view contact info; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view contact info" ON public.contact_info FOR SELECT USING (true);


--
-- Name: enrollment_content Public can view enrollment content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view enrollment content" ON public.enrollment_content FOR SELECT USING (true);


--
-- Name: home_content Public can view home content; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view home content" ON public.home_content FOR SELECT USING (true);


--
-- Name: organization_members Public can view organization members; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view organization members" ON public.organization_members FOR SELECT USING (true);


--
-- Name: organization_photos Public can view organization photos; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view organization photos" ON public.organization_photos FOR SELECT USING (true);


--
-- Name: scholarship_application_info Public can view scholarship application info; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view scholarship application info" ON public.scholarship_application_info FOR SELECT USING (true);


--
-- Name: user_roles Users can view their own roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: about_content; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

--
-- Name: announcements; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

--
-- Name: contact_info; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

--
-- Name: enrollment_content; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.enrollment_content ENABLE ROW LEVEL SECURITY;

--
-- Name: historical_personnel; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.historical_personnel ENABLE ROW LEVEL SECURITY;

--
-- Name: home_content; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.home_content ENABLE ROW LEVEL SECURITY;

--
-- Name: important_dates; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.important_dates ENABLE ROW LEVEL SECURITY;

--
-- Name: organization_members; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;

--
-- Name: organization_photos; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.organization_photos ENABLE ROW LEVEL SECURITY;

--
-- Name: organizations; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

--
-- Name: personnel; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.personnel ENABLE ROW LEVEL SECURITY;

--
-- Name: programs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

--
-- Name: scholarship_application_info; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.scholarship_application_info ENABLE ROW LEVEL SECURITY;

--
-- Name: scholarships; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.scholarships ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;