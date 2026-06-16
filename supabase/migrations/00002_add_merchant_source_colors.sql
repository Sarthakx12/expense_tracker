-- Add merchant and source columns to transactions
alter table public.transactions add column merchant text;
alter table public.transactions add column source text default 'manual' check (source in ('manual', 'import', 'recurring'));

-- Update handle_new_user() function to seed categories with colors and icons
create or replace function public.handle_new_user()
returns trigger as $$
begin
  -- 1. Create Profile
  insert into public.profiles (id, currency)
  values (new.id, 'INR');

  -- 2. Seed Default Categories
  -- Expenses
  insert into public.categories (user_id, name, type, is_default, color, icon)
  values 
    (new.id, 'Food', 'expense', true, '#f97316', 'utensils'),
    (new.id, 'Groceries', 'expense', true, '#84cc16', 'shopping-cart'),
    (new.id, 'Transport', 'expense', true, '#3b82f6', 'car'),
    (new.id, 'Bills', 'expense', true, '#ef4444', 'receipt'),
    (new.id, 'Shopping', 'expense', true, '#ec4899', 'shopping-bag'),
    (new.id, 'Entertainment', 'expense', true, '#a855f7', 'film'),
    (new.id, 'Health', 'expense', true, '#14b8a6', 'heart-pulse'),
    (new.id, 'Rent', 'expense', true, '#f59e0b', 'home'),
    (new.id, 'Education', 'expense', true, '#6366f1', 'book-open'),
    (new.id, 'Subscriptions', 'expense', true, '#06b6d4', 'credit-card'),
    (new.id, 'Other', 'expense', true, '#71717a', 'circle-ellipsis');

  -- Income
  insert into public.categories (user_id, name, type, is_default, color, icon)
  values 
    (new.id, 'Salary', 'income', true, '#22c55e', 'banknote'),
    (new.id, 'Freelance', 'income', true, '#10b981', 'briefcase'),
    (new.id, 'Other', 'income', true, '#71717a', 'circle-ellipsis');

  return new;
end;
$$ language plpgsql security definer;

-- Update existing default categories that currently have null color/icon
update public.categories set color = '#f97316', icon = 'utensils' where name = 'Food' and type = 'expense' and color is null;
update public.categories set color = '#84cc16', icon = 'shopping-cart' where name = 'Groceries' and type = 'expense' and color is null;
update public.categories set color = '#3b82f6', icon = 'car' where name = 'Transport' and type = 'expense' and color is null;
update public.categories set color = '#ef4444', icon = 'receipt' where name = 'Bills' and type = 'expense' and color is null;
update public.categories set color = '#ec4899', icon = 'shopping-bag' where name = 'Shopping' and type = 'expense' and color is null;
update public.categories set color = '#a855f7', icon = 'film' where name = 'Entertainment' and type = 'expense' and color is null;
update public.categories set color = '#14b8a6', icon = 'heart-pulse' where name = 'Health' and type = 'expense' and color is null;
update public.categories set color = '#f59e0b', icon = 'home' where name = 'Rent' and type = 'expense' and color is null;
update public.categories set color = '#6366f1', icon = 'book-open' where name = 'Education' and type = 'expense' and color is null;
update public.categories set color = '#06b6d4', icon = 'credit-card' where name = 'Subscriptions' and type = 'expense' and color is null;
update public.categories set color = '#71717a', icon = 'circle-ellipsis' where name = 'Other' and type = 'expense' and color is null;

update public.categories set color = '#22c55e', icon = 'banknote' where name = 'Salary' and type = 'income' and color is null;
update public.categories set color = '#10b981', icon = 'briefcase' where name = 'Freelance' and type = 'income' and color is null;
update public.categories set color = '#71717a', icon = 'circle-ellipsis' where name = 'Other' and type = 'income' and color is null;
