alter type "public"."app_role" rename to "app_role__old_version_to_be_dropped";

create type "public"."app_role" as enum ('creator', 'user');

alter table "public"."user_roles" alter column role type "public"."app_role" using role::text::"public"."app_role";

drop type "public"."app_role__old_version_to_be_dropped";


