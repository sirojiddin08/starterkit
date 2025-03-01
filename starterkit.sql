PGDMP      8                }            mydb     16.8 (Ubuntu 16.8-1.pgdg24.04+1)     17.4 (Ubuntu 17.4-1.pgdg24.04+2) f    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16388    mydb    DATABASE     p   CREATE DATABASE mydb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';
    DROP DATABASE mydb;
                     postgres    false                        2615    16389    auth    SCHEMA        CREATE SCHEMA auth;
    DROP SCHEMA auth;
                     postgres    false                        2615    16390    core    SCHEMA        CREATE SCHEMA core;
    DROP SCHEMA core;
                     postgres    false            
            2615    16392    settings    SCHEMA        CREATE SCHEMA settings;
    DROP SCHEMA settings;
                     postgres    false            	            2615    16391    storage    SCHEMA        CREATE SCHEMA storage;
    DROP SCHEMA storage;
                     postgres    false                        3079    16598    citext 	   EXTENSION     :   CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
    DROP EXTENSION citext;
                        false            �           0    0    EXTENSION citext    COMMENT     S   COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';
                             false    2            �            1259    16586    auth_log    TABLE     �   CREATE TABLE auth.auth_log (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "time" timestamp without time zone DEFAULT now() NOT NULL,
    user_id uuid,
    ip character varying(255)
);
    DROP TABLE auth.auth_log;
       auth         heap r       postgres    false    7            �            1259    16417    permissions    TABLE     �   CREATE TABLE auth.permissions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE auth.permissions;
       auth         heap r       postgres    false    7            �            1259    16446    role_permissions    TABLE     �   CREATE TABLE auth.role_permissions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    role_id uuid,
    permission_id uuid
);
 "   DROP TABLE auth.role_permissions;
       auth         heap r       postgres    false    7            �            1259    16406    roles    TABLE     �   CREATE TABLE auth.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE auth.roles;
       auth         heap r       postgres    false    7            �            1259    16464    sessions    TABLE     �   CREATE TABLE auth.sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    token text NOT NULL,
    expires_at timestamp without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE auth.sessions;
       auth         heap r       postgres    false    7            �            1259    16428 
   user_roles    TABLE     u   CREATE TABLE auth.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    role_id uuid
);
    DROP TABLE auth.user_roles;
       auth         heap r       postgres    false    7            �            1259    16569    user_sessions    TABLE     *  CREATE TABLE auth.user_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    refresh_token character varying(3500) DEFAULT NULL::character varying,
    expiration_time bigint,
    unique_id character varying,
    created_time timestamp without time zone DEFAULT now()
);
    DROP TABLE auth.user_sessions;
       auth         heap r       postgres    false    7            �            1259    16393    users    TABLE     �  CREATE TABLE auth.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    first_name character varying(100) NOT NULL,
    last_name character varying(100),
    username character varying(255) NOT NULL,
    password_hash text NOT NULL,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    role_id integer,
    photo character varying
);
    DROP TABLE auth.users;
       auth         heap r       postgres    false    7            �            1259    16480    logs    TABLE     �   CREATE TABLE core.logs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    action text NOT NULL,
    ip_address character varying(45),
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE core.logs;
       core         heap r       postgres    false    8            �            1259    16494    settings    TABLE     �   CREATE TABLE core.settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    key character varying(100) NOT NULL,
    value text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE core.settings;
       core         heap r       postgres    false    8            �            1259    16738 	   countries    TABLE     [  CREATE TABLE public.countries (
    id integer NOT NULL,
    code character varying,
    name public.citext NOT NULL,
    continent character varying(20),
    currency character varying(10),
    phone_code character varying(10),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.countries;
       public         heap r       postgres    false    2    2    2    2    2            �            1259    16737    countries_id_seq    SEQUENCE     �   CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.countries_id_seq;
       public               postgres    false    234            �           0    0    countries_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;
          public               postgres    false    233            �            1259    16539    orders    TABLE     �   CREATE TABLE public.orders (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    product_id uuid,
    status character varying(50) DEFAULT 'pending'::character varying,
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.orders;
       public         heap r       postgres    false            �            1259    16753    organizations    TABLE     R  CREATE TABLE public.organizations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    country_id integer NOT NULL,
    industry character varying(100),
    registration_number character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
 !   DROP TABLE public.organizations;
       public         heap r       postgres    false            �            1259    16752    organizations_id_seq    SEQUENCE     �   CREATE SEQUENCE public.organizations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.organizations_id_seq;
       public               postgres    false    236            �           0    0    organizations_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.organizations_id_seq OWNED BY public.organizations.id;
          public               postgres    false    235            �            1259    16798    products    TABLE     �  CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    legacy_name character varying(100),
    density numeric(5,3) NOT NULL,
    melt_index numeric(5,2) NOT NULL,
    country_id integer NOT NULL,
    organization_id integer NOT NULL,
    pdf_file character varying(500),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);
    DROP TABLE public.products;
       public         heap r       postgres    false            �            1259    16797    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public               postgres    false    238            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public               postgres    false    237            �            1259    16505    app_settings    TABLE     �   CREATE TABLE settings.app_settings (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    value text NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);
 "   DROP TABLE settings.app_settings;
       settings         heap r       postgres    false    10            �            1259    16516    files    TABLE       CREATE TABLE storage.files (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    file_name character varying(255) NOT NULL,
    file_path text NOT NULL,
    file_type character varying(50),
    created_at timestamp without time zone DEFAULT now()
);
    DROP TABLE storage.files;
       storage         heap r       postgres    false    9            �           2604    16741    countries id    DEFAULT     l   ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);
 ;   ALTER TABLE public.countries ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    234    233    234            �           2604    16756    organizations id    DEFAULT     t   ALTER TABLE ONLY public.organizations ALTER COLUMN id SET DEFAULT nextval('public.organizations_id_seq'::regclass);
 ?   ALTER TABLE public.organizations ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    235    236    236            �           2604    16801    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    238    237    238            |          0    16586    auth_log 
   TABLE DATA           9   COPY auth.auth_log (id, "time", user_id, ip) FROM stdin;
    auth               postgres    false    232   $       r          0    16417    permissions 
   TABLE DATA           F   COPY auth.permissions (id, name, description, created_at) FROM stdin;
    auth               postgres    false    222   S�       t          0    16446    role_permissions 
   TABLE DATA           D   COPY auth.role_permissions (id, role_id, permission_id) FROM stdin;
    auth               postgres    false    224   p�       q          0    16406    roles 
   TABLE DATA           @   COPY auth.roles (id, name, description, created_at) FROM stdin;
    auth               postgres    false    221   ��       u          0    16464    sessions 
   TABLE DATA           L   COPY auth.sessions (id, user_id, token, expires_at, created_at) FROM stdin;
    auth               postgres    false    225   ��       s          0    16428 
   user_roles 
   TABLE DATA           8   COPY auth.user_roles (id, user_id, role_id) FROM stdin;
    auth               postgres    false    223   ǀ       {          0    16569    user_sessions 
   TABLE DATA           k   COPY auth.user_sessions (id, user_id, refresh_token, expiration_time, unique_id, created_time) FROM stdin;
    auth               postgres    false    231   �       p          0    16393    users 
   TABLE DATA           �   COPY auth.users (id, first_name, last_name, username, password_hash, is_active, created_at, updated_at, role_id, photo) FROM stdin;
    auth               postgres    false    220   D�       v          0    16480    logs 
   TABLE DATA           I   COPY core.logs (id, user_id, action, ip_address, created_at) FROM stdin;
    core               postgres    false    226   ^�       w          0    16494    settings 
   TABLE DATA           <   COPY core.settings (id, key, value, created_at) FROM stdin;
    core               postgres    false    227   {�       ~          0    16738 	   countries 
   TABLE DATA           l   COPY public.countries (id, code, name, continent, currency, phone_code, created_at, updated_at) FROM stdin;
    public               postgres    false    234   ��       z          0    16539    orders 
   TABLE DATA           M   COPY public.orders (id, user_id, product_id, status, created_at) FROM stdin;
    public               postgres    false    230   �       �          0    16753    organizations 
   TABLE DATA           t   COPY public.organizations (id, name, country_id, industry, registration_number, created_at, updated_at) FROM stdin;
    public               postgres    false    236   �       �          0    16798    products 
   TABLE DATA           �   COPY public.products (id, name, legacy_name, density, melt_index, country_id, organization_id, pdf_file, created_at, updated_at) FROM stdin;
    public               postgres    false    238   L�       x          0    16505    app_settings 
   TABLE DATA           E   COPY settings.app_settings (id, name, value, created_at) FROM stdin;
    settings               postgres    false    228   ��       y          0    16516    files 
   TABLE DATA           Z   COPY storage.files (id, user_id, file_name, file_path, file_type, created_at) FROM stdin;
    storage               postgres    false    229   ��       �           0    0    countries_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.countries_id_seq', 1, false);
          public               postgres    false    233            �           0    0    organizations_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.organizations_id_seq', 1, false);
          public               postgres    false    235            �           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 6, true);
          public               postgres    false    237            �           2606    16592    auth_log auth_log_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY auth.auth_log
    ADD CONSTRAINT auth_log_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY auth.auth_log DROP CONSTRAINT auth_log_pkey;
       auth                 postgres    false    232            �           2606    16427     permissions permissions_name_key 
   CONSTRAINT     Y   ALTER TABLE ONLY auth.permissions
    ADD CONSTRAINT permissions_name_key UNIQUE (name);
 H   ALTER TABLE ONLY auth.permissions DROP CONSTRAINT permissions_name_key;
       auth                 postgres    false    222            �           2606    16425    permissions permissions_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY auth.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY auth.permissions DROP CONSTRAINT permissions_pkey;
       auth                 postgres    false    222            �           2606    16451 &   role_permissions role_permissions_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY auth.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY auth.role_permissions DROP CONSTRAINT role_permissions_pkey;
       auth                 postgres    false    224            �           2606    16453 ;   role_permissions role_permissions_role_id_permission_id_key 
   CONSTRAINT     �   ALTER TABLE ONLY auth.role_permissions
    ADD CONSTRAINT role_permissions_role_id_permission_id_key UNIQUE (role_id, permission_id);
 c   ALTER TABLE ONLY auth.role_permissions DROP CONSTRAINT role_permissions_role_id_permission_id_key;
       auth                 postgres    false    224    224            �           2606    16416    roles roles_name_key 
   CONSTRAINT     M   ALTER TABLE ONLY auth.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);
 <   ALTER TABLE ONLY auth.roles DROP CONSTRAINT roles_name_key;
       auth                 postgres    false    221            �           2606    16414    roles roles_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY auth.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY auth.roles DROP CONSTRAINT roles_pkey;
       auth                 postgres    false    221            �           2606    16472    sessions sessions_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY auth.sessions DROP CONSTRAINT sessions_pkey;
       auth                 postgres    false    225            �           2606    16474    sessions sessions_token_key 
   CONSTRAINT     U   ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);
 C   ALTER TABLE ONLY auth.sessions DROP CONSTRAINT sessions_token_key;
       auth                 postgres    false    225            �           2606    16580    user_sessions unique_user_id 
   CONSTRAINT     X   ALTER TABLE ONLY auth.user_sessions
    ADD CONSTRAINT unique_user_id UNIQUE (user_id);
 D   ALTER TABLE ONLY auth.user_sessions DROP CONSTRAINT unique_user_id;
       auth                 postgres    false    231            �           2606    16433    user_roles user_roles_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY auth.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY auth.user_roles DROP CONSTRAINT user_roles_pkey;
       auth                 postgres    false    223            �           2606    16435 )   user_roles user_roles_user_id_role_id_key 
   CONSTRAINT     n   ALTER TABLE ONLY auth.user_roles
    ADD CONSTRAINT user_roles_user_id_role_id_key UNIQUE (user_id, role_id);
 Q   ALTER TABLE ONLY auth.user_roles DROP CONSTRAINT user_roles_user_id_role_id_key;
       auth                 postgres    false    223    223            �           2606    16578    user_sessions user_tokens_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY auth.user_sessions
    ADD CONSTRAINT user_tokens_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY auth.user_sessions DROP CONSTRAINT user_tokens_pkey;
       auth                 postgres    false    231            �           2606    16403    users users_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY auth.users DROP CONSTRAINT users_pkey;
       auth                 postgres    false    220            �           2606    16405    users users_username_key 
   CONSTRAINT     U   ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
 @   ALTER TABLE ONLY auth.users DROP CONSTRAINT users_username_key;
       auth                 postgres    false    220            �           2606    16488    logs logs_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY core.logs
    ADD CONSTRAINT logs_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY core.logs DROP CONSTRAINT logs_pkey;
       core                 postgres    false    226            �           2606    16504    settings settings_key_key 
   CONSTRAINT     Q   ALTER TABLE ONLY core.settings
    ADD CONSTRAINT settings_key_key UNIQUE (key);
 A   ALTER TABLE ONLY core.settings DROP CONSTRAINT settings_key_key;
       core                 postgres    false    227            �           2606    16502    settings settings_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY core.settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY core.settings DROP CONSTRAINT settings_pkey;
       core                 postgres    false    227            �           2606    16749    countries countries_name_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_name_key UNIQUE (name);
 F   ALTER TABLE ONLY public.countries DROP CONSTRAINT countries_name_key;
       public                 postgres    false    234            �           2606    16747    countries countries_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.countries DROP CONSTRAINT countries_pkey;
       public                 postgres    false    234            �           2606    16546    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public                 postgres    false    230            �           2606    16762 $   organizations organizations_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_name_key UNIQUE (name);
 N   ALTER TABLE ONLY public.organizations DROP CONSTRAINT organizations_name_key;
       public                 postgres    false    236            �           2606    16760     organizations organizations_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.organizations DROP CONSTRAINT organizations_pkey;
       public                 postgres    false    236            �           2606    16764 3   organizations organizations_registration_number_key 
   CONSTRAINT     }   ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT organizations_registration_number_key UNIQUE (registration_number);
 ]   ALTER TABLE ONLY public.organizations DROP CONSTRAINT organizations_registration_number_key;
       public                 postgres    false    236            �           2606    16807    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public                 postgres    false    238            �           2606    16515 "   app_settings app_settings_name_key 
   CONSTRAINT     _   ALTER TABLE ONLY settings.app_settings
    ADD CONSTRAINT app_settings_name_key UNIQUE (name);
 N   ALTER TABLE ONLY settings.app_settings DROP CONSTRAINT app_settings_name_key;
       settings                 postgres    false    228            �           2606    16513    app_settings app_settings_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY settings.app_settings
    ADD CONSTRAINT app_settings_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY settings.app_settings DROP CONSTRAINT app_settings_pkey;
       settings                 postgres    false    228            �           2606    16524    files files_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY storage.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY storage.files DROP CONSTRAINT files_pkey;
       storage                 postgres    false    229            �           1259    16750    idx_countries_code    INDEX     H   CREATE INDEX idx_countries_code ON public.countries USING btree (code);
 &   DROP INDEX public.idx_countries_code;
       public                 postgres    false    234            �           1259    16751    idx_countries_name    INDEX     H   CREATE INDEX idx_countries_name ON public.countries USING btree (name);
 &   DROP INDEX public.idx_countries_name;
       public                 postgres    false    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    2    234            �           1259    16771    idx_organizations_country_id    INDEX     \   CREATE INDEX idx_organizations_country_id ON public.organizations USING btree (country_id);
 0   DROP INDEX public.idx_organizations_country_id;
       public                 postgres    false    236            �           1259    16770    idx_organizations_name    INDEX     P   CREATE INDEX idx_organizations_name ON public.organizations USING btree (name);
 *   DROP INDEX public.idx_organizations_name;
       public                 postgres    false    236            �           1259    16819    idx_products_country_id    INDEX     R   CREATE INDEX idx_products_country_id ON public.products USING btree (country_id);
 +   DROP INDEX public.idx_products_country_id;
       public                 postgres    false    238            �           1259    16818    idx_products_name    INDEX     F   CREATE INDEX idx_products_name ON public.products USING btree (name);
 %   DROP INDEX public.idx_products_name;
       public                 postgres    false    238            �           1259    16820    idx_products_organization_id    INDEX     \   CREATE INDEX idx_products_organization_id ON public.products USING btree (organization_id);
 0   DROP INDEX public.idx_products_organization_id;
       public                 postgres    false    238            �           2606    16581    user_sessions fk_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY auth.user_sessions
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
 @   ALTER TABLE ONLY auth.user_sessions DROP CONSTRAINT fk_user_id;
       auth               postgres    false    3478    220    231            �           2606    16593    auth_log fk_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY auth.auth_log
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
 ;   ALTER TABLE ONLY auth.auth_log DROP CONSTRAINT fk_user_id;
       auth               postgres    false    3478    220    232            �           2606    16459 4   role_permissions role_permissions_permission_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth.permissions(id) ON DELETE CASCADE;
 \   ALTER TABLE ONLY auth.role_permissions DROP CONSTRAINT role_permissions_permission_id_fkey;
       auth               postgres    false    224    222    3488            �           2606    16454 .   role_permissions role_permissions_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES auth.roles(id) ON DELETE CASCADE;
 V   ALTER TABLE ONLY auth.role_permissions DROP CONSTRAINT role_permissions_role_id_fkey;
       auth               postgres    false    224    221    3484            �           2606    16475    sessions sessions_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
 F   ALTER TABLE ONLY auth.sessions DROP CONSTRAINT sessions_user_id_fkey;
       auth               postgres    false    220    3478    225            �           2606    16441 "   user_roles user_roles_role_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES auth.roles(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY auth.user_roles DROP CONSTRAINT user_roles_role_id_fkey;
       auth               postgres    false    221    223    3484            �           2606    16436 "   user_roles user_roles_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY auth.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY auth.user_roles DROP CONSTRAINT user_roles_user_id_fkey;
       auth               postgres    false    223    220    3478            �           2606    16489    logs logs_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY core.logs
    ADD CONSTRAINT logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
 >   ALTER TABLE ONLY core.logs DROP CONSTRAINT logs_user_id_fkey;
       core               postgres    false    220    226    3478            �           2606    16765    organizations fk_country    FK CONSTRAINT     �   ALTER TABLE ONLY public.organizations
    ADD CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.organizations DROP CONSTRAINT fk_country;
       public               postgres    false    236    3524    234            �           2606    16808    products fk_country    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_country FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;
 =   ALTER TABLE ONLY public.products DROP CONSTRAINT fk_country;
       public               postgres    false    234    3524    238            �           2606    16813    products fk_organization    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_organization FOREIGN KEY (organization_id) REFERENCES public.organizations(id) ON DELETE CASCADE;
 B   ALTER TABLE ONLY public.products DROP CONSTRAINT fk_organization;
       public               postgres    false    236    3532    238            �           2606    16547    orders orders_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public               postgres    false    230    3478    220            �           2606    16525    files files_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY storage.files
    ADD CONSTRAINT files_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;
 C   ALTER TABLE ONLY storage.files DROP CONSTRAINT files_user_id_fkey;
       storage               postgres    false    3478    229    220            |     x����qC1е_n�7���%!��K������k�{�2�ȜJj`� R��,�4g������Y�k턷�>��L��N�4G0�	��}5۴��{������H=��|#C%�M�Wd{WZW�������@UD�`T)P�t�r���.ޱ�T����M��K�=�5�$G#*`.v�5�����V�F�O�v�-[%7�AR��ۄ5TGY����>Q;i/r�����t��r�mp�	$un�\��1��}l�k�ULLРz>PƖALS<�q{��t|%||G���뺾H�Z      r      x������ � �      t      x������ � �      q      x������ � �      u      x������ � �      s      x������ � �      {   P  x�%��n�0�5y�yG���[�FNc�3��(��t43"��K�����\Y�(��!eqUS�( )o�8jk5#�YzI 1�������▶q�<v]�u}���qV����8��P��S���e�i����h@oͼ?�W=��'t\�W�����A��q�wc�|c�����I���lS@J۟�(�f1�T<�ӳ�|�
�Po�>�пc�v��չ�9B�1T'So/ݤ������}1�f����!��1���v�m��w�ݫ~���t|u�����T�G���H�J�!��8Yք3p�d\	�*)9� @	�x���Fd���j���6x�      p   
  x���KOA�ϳ���^zz^={�`T��;\fgv����#¯�x���t�KY�����ؘ@ר�6����90���i�6�FL�"�
����/��U�8H���O�s���s�o��������v�ȍ.gkK��ڊ� $H@�Hb���\*i��I���a�.'�IAl��<+A��}�8Sf1n?fOmJ��uz݊Cӑ���p��?{�}�:J	��z;p�7��cD"%#�Ӱz����<าR�"_jV�ݾh�<)������m      v      x������ � �      w      x������ � �      ~   =   x�3�,���JJ��,.I���"##S]#]#SC+#c+CC=KSC<R\1z\\\ q�b      z      x������ � �      �   :   x�3����/JO��4��!##S]#]#SC+#c+Cs=3C3KSC<R\1z\\\ �L<      �   A   x�3�LIKOK�LKҜ�z�z��� ��id`d�k`�kd�`hleDFz��&�Ĺb���� �      x      x������ � �      y      x������ � �     