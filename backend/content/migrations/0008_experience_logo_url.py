from django.db import migrations, models


COMPANY_LOGOS = {
    "Andela": "/experience-logos/andela.png",
    "Rainforest Alliance": "/experience-logos/rainforest-alliance.png",
    "Jipamba": "/experience-logos/jipamba.png",
    "Teknobyte": "/experience-logos/teknobyte.jpg",
    "Shelter Animals Count": "/experience-logos/shelter-animals-count.png",
    "WeSpire": "/experience-logos/wespire.png",
    "BombFell": "/experience-logos/bombfell.png",
    "Bombfell": "/experience-logos/bombfell.png",
    "Asset-Map": "/experience-logos/asset-map.png",
}


def populate_experience_logos(apps, schema_editor):
    Experience = apps.get_model("content", "Experience")

    for experience in Experience.objects.all():
        logo_url = COMPANY_LOGOS.get(experience.company)
        if logo_url and experience.logo_url != logo_url:
            experience.logo_url = logo_url
            experience.save(update_fields=["logo_url"])


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0007_project_model_and_seed_projects"),
    ]

    operations = [
        migrations.AddField(
            model_name="experience",
            name="logo_url",
            field=models.CharField(blank=True, max_length=500),
        ),
        migrations.RunPython(populate_experience_logos, migrations.RunPython.noop),
    ]
