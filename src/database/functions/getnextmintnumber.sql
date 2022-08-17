-- FUNCTION: public.getNextMintNumber()

-- DROP FUNCTION IF EXISTS public.getnextmintnumber();

CREATE OR REPLACE FUNCTION public.getnextmintnumber(
	)
    RETURNS integer
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
declare
   mintNumber integer; 
begin
   -- select the number of actors from the actor table
   SELECT mint_number
   into mintNumber
   FROM public.beebea
	ORDER BY mint_number DESC
	LIMIT 1;
   
	IF mintNumber IS NULL THEN
		mintNumber = 1;
	ELSE
		mintNumber = mintNumber + 1;
	END IF;

	
   RAISE NOTICE 'mintNumber: %', mintNumber;
   
   RETURN(mintNumber);

end;
$BODY$;

ALTER FUNCTION public.getnextmintnumber()
    OWNER TO postgres;