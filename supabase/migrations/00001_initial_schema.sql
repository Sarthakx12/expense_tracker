-- Enable required extensions
create extension if not exists "uuid-ossp";

-- 1. PROFILES
create table public.profiles (
    id uuid references auth.users on delete cascade primary key,
    full_name text,
    avatar_url text,
    currency text default 'INR',
    monthly_income numeric default 0,
    created_at timestamptz default now() not null,
    updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

-- 2. CATEGORIES
create table public.categories (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    name text not null,
    type text not null check (type in ('expense', 'income')),
    icon text,
    color text,
    is_default boolean default false,
    created_at timestamptz default now() not null
);

alter table public.categories enable row level security;
create policy "Users can manage their categories" on public.categories for all using (auth.uid() = user_id);

-- 3. TRANSACTIONS
create table public.transactions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    amount numeric not null,
    type text not null check (type in ('expense', 'income')),
    category_id uuid references public.categories on delete set null,
    description text,
    date date not null,
    notes text,
    is_recurring boolean default false,
    created_at timestamptz default now() not null
);

alter table public.transactions enable row level security;
create policy "Users can manage their transactions" on public.transactions for all using (auth.uid() = user_id);

-- 4. CATEGORY RULES
create table public.category_rules (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    keyword text not null,
    category_id uuid references public.categories on delete cascade not null,
    created_at timestamptz default now() not null
);

alter table public.category_rules enable row level security;
create policy "Users can manage their category rules" on public.category_rules for all using (auth.uid() = user_id);

-- 5. BUDGETS
create table public.budgets (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    category_id uuid references public.categories on delete cascade not null,
    amount numeric not null,
    period text default 'monthly' check (period in ('weekly', 'monthly', 'yearly')),
    start_date date,
    end_date date,
    created_at timestamptz default now() not null
);

alter table public.budgets enable row level security;
create policy "Users can manage their budgets" on public.budgets for all using (auth.uid() = user_id);

-- 6. RECURRING
create table public.recurring (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    amount numeric not null,
    type text not null check (type in ('expense', 'income')),
    category_id uuid references public.categories on delete set null,
    description text,
    frequency text not null check (frequency in ('daily', 'weekly', 'monthly', 'yearly')),
    next_date date not null,
    is_active boolean default true,
    created_at timestamptz default now() not null
);

alter table public.recurring enable row level security;
create policy "Users can manage their recurring transactions" on public.recurring for all using (auth.uid() = user_id);

-- 7. GOALS
create table public.goals (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    name text not null,
    target_amount numeric not null,
    current_amount numeric default 0 not null,
    deadline date,
    icon text,
    color text,
    is_completed boolean default false,
    created_at timestamptz default now() not null
);

alter table public.goals enable row level security;
create policy "Users can manage their goals" on public.goals for all using (auth.uid() = user_id);

-- 8. AI MESSAGES
create table public.ai_messages (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users on delete cascade not null,
    role text not null check (role in ('user', 'assistant', 'system')),
    content text not null,
    metadata jsonb,
    created_at timestamptz default now() not null
);

alter table public.ai_messages enable row level security;
create policy "Users can manage their ai messages" on public.ai_messages for all using (auth.uid() = user_id);


-- FUNCTION: handle_new_user()
-- Triggered after insert on auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- 1. Create Profile
  insert into public.profiles (id, currency)
  values (new.id, 'INR');

  -- 2. Seed Default Categories
  -- Expenses
  insert into public.categories (user_id, name, type, is_default)
  values 
    (new.id, 'Food', 'expense', true),
    (new.id, 'Groceries', 'expense', true),
    (new.id, 'Transport', 'expense', true),
    (new.id, 'Bills', 'expense', true),
    (new.id, 'Shopping', 'expense', true),
    (new.id, 'Entertainment', 'expense', true),
    (new.id, 'Health', 'expense', true),
    (new.id, 'Rent', 'expense', true),
    (new.id, 'Education', 'expense', true),
    (new.id, 'Subscriptions', 'expense', true),
    (new.id, 'Other', 'expense', true);

  -- Income
  insert into public.categories (user_id, name, type, is_default)
  values 
    (new.id, 'Salary', 'income', true),
    (new.id, 'Freelance', 'income', true),
    (new.id, 'Other', 'income', true);

  return new;
end;
$$ language plpgsql security definer;

-- TRIGGER: on_auth_user_created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
